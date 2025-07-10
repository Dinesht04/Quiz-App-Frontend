'use client';

import { useGlobalContext } from '@/app/providers/GlobalContext';
import { Question, useQuizContext } from '@/app/providers/QuizContext';
import { useSocket } from '@/app/providers/WebsocketContextProvider';
import { Dispatch, SetStateAction, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Clock } from 'lucide-react';

type QuestionCardProps = {
  username:string;
  Question: Question;
  setCurrentQuestion: Dispatch<SetStateAction<string>>;
  roomId: string | undefined;
};

export default function QuestionCard({
  username,
  Question,
  setCurrentQuestion,
  roomId,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { socket } = useSocket();
  const { setQuestionsCompleted } = useQuizContext();

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
        setQuestionsCompleted(true);
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
    setSelectedOption(option);
    setIsAnswered(true);

    // Add a small delay for visual feedback
    setTimeout(() => {
      sendAnswer(option);
      setNextQuestion(Question.id);
    }, 500);
  }

  // Get question number for display
  const questionNumber = Question.id.replace('q', '');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
        {/* Question Header */}
        <CardHeader className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white py-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Question {questionNumber} of 5
                </p>
                <div className="w-32 h-2 bg-white/20 rounded-full mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${(parseInt(questionNumber) / 5) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Think Fast!</span>
            </div>
          </div>

          <CardTitle className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
            {Question.prompt}
          </CardTitle>
        </CardHeader>

        {/* Options */}
        <CardContent className="p-8">
          <div className="space-y-4">
            {Question.options.map((option, index) => {
              const optionLabels = ['A', 'B', 'C', 'D'];
              const isSelected = selectedOption === option;

              return (
                <button
                  key={index}
                  onClick={() => !isAnswered && onAnswer(option)}
                  disabled={isAnswered}
                  className={`group w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    isSelected && isAnswered
                      ? 'bg-gradient-to-r from-green-100 to-blue-100 border-green-400 shadow-lg'
                      : isAnswered
                        ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-purple-300 hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-4 text-left">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        isSelected && isAnswered
                          ? 'bg-green-500 text-white'
                          : isAnswered
                            ? 'bg-gray-300 text-gray-500'
                            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white group-hover:from-purple-600 group-hover:to-blue-600'
                      }`}
                    >
                      {optionLabels[index]}
                    </div>
                    <div
                      className={`text-lg font-medium transition-colors duration-300 ${
                        isSelected && isAnswered
                          ? 'text-green-800'
                          : isAnswered
                            ? 'text-gray-500'
                            : 'text-gray-800 group-hover:text-purple-700'
                      }`}
                    >
                      {option}
                    </div>
                    {isSelected && isAnswered && (
                      <div className="ml-auto">
                        <Zap className="w-6 h-6 text-green-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-semibold">
                  Answer submitted! Moving to next question...
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </div>
  );
}
