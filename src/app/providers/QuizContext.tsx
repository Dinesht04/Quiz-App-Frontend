'use client';
import { useContext,createContext,ReactNode, useState, Dispatch, SetStateAction } from "react";

export type Question = {
    id:"q1"|"q2"|"q3"|"q4"|"q5",
    prompt:string,
    options:string[],
    correct:string;
}

interface QuizContextType {
    joinedRoom: boolean,
    setJoinedRoom:Dispatch<SetStateAction<boolean>>,
    questions:Question[]|undefined,
    setQuestions:Dispatch<SetStateAction<Question[]|undefined>>,
    roomId:string | undefined,
    setRoomId:Dispatch<SetStateAction<string | undefined>>,
    quizStarted: boolean, 
    setQuizStarted: Dispatch<SetStateAction<boolean>>,
    quizFinished: boolean, 
    setQuizFinished: Dispatch<SetStateAction<boolean>>,
    score:number,
    setScore:Dispatch<SetStateAction<number>>
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export default function QuizContextProvider({ children }: { children: ReactNode }){
        const [roomId,setRoomId] = useState<string | undefined>()
        const [joinedRoom, setJoinedRoom] = useState(false);
        const [quizStarted, setQuizStarted] = useState(false);
        const [quizFinished, setQuizFinished] = useState(false);
        const [questions,setQuestions] = useState<Question[]|undefined>(undefined);
        const [score,setScore] = useState<number>(0);

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
            setQuizFinished
        };
        
            return (
                <QuizContext.Provider value={contextValue}>
                    {children}
                </QuizContext.Provider>
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