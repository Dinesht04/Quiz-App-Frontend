'use client';

import { useGlobalContext } from '@/app/providers/GlobalContext';
import { Question, useQuizContext } from '@/app/providers/QuizContext';
import { useSocket } from '@/app/providers/WebsocketContextProvider';
import { Dispatch, SetStateAction, useState } from 'react';

type QuestionCardProps = {
  Question: Question;
  setCurrentQuestion: Dispatch<SetStateAction<string>>;
  roomId: string | undefined;
};

export default function QuestionCard({
  Question,
  setCurrentQuestion,
  roomId,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { socket } = useSocket();
  const { setQuizFinished } = useQuizContext();
  const { username } = useGlobalContext();

  function setNextQuestion(currentQues: string | null) {
    switch (currentQues) {
      case 'q1':
        setCurrentQuestion('q2');
        break;
      case 'q2':
        setCurrentQuestion('q3');
        break;
      case 'q3':
        setCurrentQuestion('q4');
        break;
      case 'q4':
        setCurrentQuestion('q5');
        break;
      case 'q5':
        setCurrentQuestion('over');
        finishQuiz();
        setQuizFinished(true);
        break;
      default:
        setCurrentQuestion('idk');
        break;
    }
  }

  function sendAnswer(option: string) {
    const payload = {
      type: 'answer',
      payload: {
        QuestionId: Question.id,
        Answer: option,
        roomId: roomId,
        username: username,
      },
    };
    socket?.send(JSON.stringify(payload));
  }

  function finishQuiz() {
    const payload = {
      type: 'finish',
      payload: {
        roomId: roomId,
      },
    };
    socket?.send(JSON.stringify(payload));
  }

  function onAnswer(option: string) {
    //send ws the answer,
    //once recieved, update the score
    //proceed to next question
    sendAnswer(option);
    setNextQuestion(Question.id);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">{Question.prompt}</h2>
      <div className="space-y-2">
        {Question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              onAnswer(option);
            }}
            className={`block w-full text-left px-4 py-2 rounded-lg border ${
              selectedOption === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {/* <button
            onClick={() => setNextQuestion(Question.id)}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
            Next
        </button> */}
    </div>
  );
}
