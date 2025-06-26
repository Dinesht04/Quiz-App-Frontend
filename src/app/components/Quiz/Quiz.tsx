"use client"

import { useQuizContext } from "@/app/providers/QuizContext"
import { redirect } from "next/navigation";
import { useState } from "react";
import QuestionCard from "../Cards/QuestionCard";






[
    {
      "id": "q1",
      "prompt": "Which HTML tag is used to define an unordered list?",
      "options": [
        "<ul>",
        "<ol>",
        "<li>",
        "<list>"
      ],
      "correct": "<ul>"
    },
    {
      "id": "q2",
      "prompt": "What does CSS stand for?",
      "options": [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Styling System",
        "Colorful Style Syntax"
      ],
      "correct": "Cascading Style Sheets"
    },
    {
      "id": "q3",
      "prompt": "Which HTTP method is typically used to retrieve data from a server?",
      "options": [
        "GET",
        "POST",
        "PUT",
        "DELETE"
      ],
      "correct": "GET"
    },
    {
      "id": "q4",
      "prompt": "Which JavaScript function is used to write content to the web page?",
      "options": [
        "console.log()",
        "document.write()",
        "window.alert()",
        "print()"
      ],
      "correct": "document.write()"
    },
    {
      "id": "q5",
      "prompt": "What is the default port for HTTP?",
      "options": [
        "80",
        "443",
        "21",
        "3306"
      ],
      "correct": "80"
    }
  ]

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