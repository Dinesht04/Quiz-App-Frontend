'use client';

import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { chatMessage } from "../components/Cards/ChatCard";

export type Question = {
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5';
  prompt: string;
  options: string[];
  correct: string;
};

export type score = {
  username:string,
  score:string
}


interface QuizContextType {
  joinedRoom: boolean;
  setJoinedRoom: Dispatch<SetStateAction<boolean>>;
  questions: Question[] | undefined;
  setQuestions: Dispatch<SetStateAction<Question[] | undefined>>;
  roomId: string | undefined;
  setRoomId: Dispatch<SetStateAction<string | undefined>>;
  quizStarted: boolean;
  setQuizStarted: Dispatch<SetStateAction<boolean>>;
  quizFinished: boolean;
  setQuizFinished: Dispatch<SetStateAction<boolean>>;
  questionsCompleted: boolean;
  setQuestionsCompleted: Dispatch<SetStateAction<boolean>>;
  isHost: boolean;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  chatMessages:chatMessage[],
  setChatMessages:Dispatch<SetStateAction<chatMessage[]>>,
  finalScore:score[],
  setFinalScore:Dispatch<SetStateAction<score[]>>
  liveScore:score[];
  setLiveScore:Dispatch<SetStateAction<score[]>>
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);


export default function QuizContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [roomId, setRoomId] = useState<string | undefined>();
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined);
  const [score, setScore] = useState<number>(0);
  const [chatMessages,setChatMessages] = useState<chatMessage[]>([]);
  const [isHost,setIsHost] = useState<boolean>(false);
  const [finalScore,setFinalScore] = useState<score[]>([]);
  const [liveScore,setLiveScore] = useState<score[]>([]);

  const contextValue = {
    joinedRoom,
    setJoinedRoom,
    questions,
    setQuestions,
    roomId,
    setRoomId,
    quizStarted,
    setQuizStarted,
    score,
    setScore,
    quizFinished,
    setQuizFinished,
    chatMessages,
    setChatMessages,
    isHost,
    setIsHost,
    finalScore,
    setFinalScore,
    questionsCompleted,
    setQuestionsCompleted,
    liveScore,
    setLiveScore
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}

// Custom hook to consume the WebSocket context
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizContextProvider');
  }
  return context;
};
