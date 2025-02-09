import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsDemo() {
  const words = ["better", "smarter", "personalized", "future-ready"];

  return (
    <div className="flex justify-center items-center">
      <div className="text-[22px] md:text-[42px] mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        career paths with SaarthiGenAI
      </div>
    </div>
  );
}
