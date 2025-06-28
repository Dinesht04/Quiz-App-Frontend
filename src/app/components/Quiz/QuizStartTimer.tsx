import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useQuizContext } from '@/app/providers/QuizContext';

export default function QuizStartTimer() {
  const { setQuizStarted } = useQuizContext();
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    if (seconds <= 0) {
      console.log('Quiz Started');
      setQuizStarted(true);
      redirect('/Quiz');
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return <div>Quiz Starting in {seconds}.</div>;
}
