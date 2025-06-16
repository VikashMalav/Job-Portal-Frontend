const AwesomeLoader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0f172a]">
      <div className="flex flex-col items-center gap-6 p-10 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl">
        {/* Subtle animated glowing ring */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-lg opacity-30 animate-ping"></div>
          <div className="w-full h-full rounded-full border-4 border-t-blue-400 border-b-purple-500 border-opacity-60 animate-spin" />
        </div>

        {/* Animated text */}
        <h2 className="text-white text-lg font-medium tracking-wide animate-pulse">
          Finding the perfect job for you...
        </h2>
      </div>
    </div>
  );
};

export default AwesomeLoader;
