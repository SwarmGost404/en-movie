import { useState } from "react";
import LevelEn from "../LevelEn";

type Level = "easy" | "medium" | "hard" | "none";

function Recommendations() {
  const [selectedLevel, setLevel] = useState<Level>("none");

  const levels: Level[] = ["easy", "medium", "hard"]; 

  return (
    <main className="container mx-auto px-4">
      <h1 className="mt-12 text-center text-4xl font-bold">
        Укажите свой уровень английского:
      </h1>
      
      <div className="mt-24 grid gap-4 p-2 md:flex md:justify-center">
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`
              mx-auto w-full rounded-lg border-2 border-amber-500 p-3 
              transition-all hover:scale-110 md:w-32
              ''}
            `}
          >
            {lvl}
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <LevelEn level={selectedLevel} /></div>
    </main>
  );
}

export default Recommendations;