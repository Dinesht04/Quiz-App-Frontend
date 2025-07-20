import { useQuizContext } from '@/app/providers/QuizContext';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import React from 'react';


export default function QuizTypeSelector(){

  const {roomType,setRoomType} = useQuizContext();

  const handleValueChange = (value: string) => {
    if (value === 'Quiz' || value === 'Lightning') {
      setRoomType(value);
      console.log(value);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 font-inter">
      <label htmlFor="quiz-round-type" className="text-xl font-bold text-gray-200 mb-2">
        Choose Round Type
      </label>

      <ToggleGroup
        type="single"
        value={roomType}
        onValueChange={handleValueChange}
        className="bg-gray-950 p-1 rounded-full border border-gray-800 shadow-xl shadow-purple-900/30 inline-flex max-w-full flex-wrap justify-center gap-1"
      >
        <ToggleGroupItem
          value="Quiz"
          aria-label="Normal Quiz Round"
          className="
            px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
            data-[state=off]:bg-gray-800 data-[state=off]:text-gray-400 data-[state=off]:hover:bg-gray-700 data-[state=off]:hover:text-gray-200
            data-[state=on]:bg-gradient-to-br data-[state=on]:from-purple-600 data-[state=on]:to-blue-500 data-[state=on]:text-white
            data-[state=on]:shadow-md data-[state=on]:shadow-purple-500/50 data-[state=on]:border-none
            focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
            flex-grow sm:flex-grow-0
          "
        >
          Normal Quiz Round
        </ToggleGroupItem>

        <ToggleGroupItem
          value="Lightning"
          aria-label="Lightning Round"
          className="
            px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
            data-[state=off]:bg-gray-800 data-[state=off]:text-gray-400 data-[state=off]:hover:bg-gray-700 data-[state=off]:hover:text-gray-200
            data-[state=on]:bg-gradient-to-br data-[state=on]:from-cyan-500 data-[state=on]:to-teal-400 data-[state=on]:text-white
            data-[state=on]:shadow-md data-[state=on]:shadow-cyan-500/50 data-[state=on]:border-none
            focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
            flex-grow sm:flex-grow-0
          "
        >
          Fastest Finger First
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
