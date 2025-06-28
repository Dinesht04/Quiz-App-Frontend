"use client"

import { useQuizContext } from "@/app/providers/QuizContext"
import { redirect } from "next/navigation";
import { useState } from "react";
import QuestionCard from "../Cards/QuestionCard";

export default function Quiz(){
    const {questions,joinedRoom,quizStarted,score,roomId} = useQuizContext();
    const [currentQuestion,setCurrentQuestion] = useState<string>("q1")


    if(!joinedRoom || !quizStarted){
        redirect('/')
    }

    if(currentQuestion === "over"){
      return(
        <div>
          QUiz Over
          Personal SCore - {score} 
          Overall SCore when quiz ended is console.logged. Have yet to track the state and display it propoerly
        </div>
      )
    }

    return(
    <div>
        Questions
        Current Score - {score}
        {questions?.map((Question)=>{
          if(currentQuestion === Question.id){
            return(
                  <QuestionCard 
                  Question={Question}
                  setCurrentQuestion={setCurrentQuestion}
                  roomId={roomId}
                  />
            )}
        })}
    </div>
)
}