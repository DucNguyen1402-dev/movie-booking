const MovieScreen = () => {
  return (
    <div className="mb-10 flex w-full flex-col items-center">
      {/* Visual representation of the theater screen */}
      <div className="relative h-16 w-full">
        <div className="absolute inset-0 flex translate-x-10 items-center justify-center rounded-md bg-linear-to-b from-orange-400 via-orange-300 to-orange-200 font-bold tracking-[0.3em] text-white shadow-[0_15px_50px_rgba(255,255,255,0.7)]">
          SCREEN
        </div>
      </div>
    </div>
  );
};

export default MovieScreen;
