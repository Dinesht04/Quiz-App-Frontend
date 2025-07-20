import { useQuizContext } from "@/app/providers/QuizContext"
import { useState } from "react";

type LightningRoundProps = {
  currentQuestion: string
}

export default function LightningRound({currentQuestion}:LightningRoundProps){

  //whenever I recieve move-ont-o-next ping, Ill change the current question to the next one and show A toast of the user who answered correct

  const {questions} = useQuizContext();

  return(
    <div>

    </div>
  )

}
