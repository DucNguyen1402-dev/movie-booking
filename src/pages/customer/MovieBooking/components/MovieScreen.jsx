import React from "react";

const MovieScreen = () => {
  return (
    <div className="w-full flex flex-col items-center mb-10">
      {/* Visual representation of the theater screen */}
      <div className="relative w-full h-16">
        <div
          className="
      absolute inset-0
      rounded-md
      bg-linear-to-b
      from-orange-400
      via-orange-300
      to-orange-200
      shadow-[0_15px_50px_rgba(255,255,255,0.7)]
      flex items-center justify-center
      font-bold tracking-[0.3em]
      text-white
      translate-x-10
    "
        >
          SCREEN
        </div>
      </div>
    </div>
  );
};

export default MovieScreen;
