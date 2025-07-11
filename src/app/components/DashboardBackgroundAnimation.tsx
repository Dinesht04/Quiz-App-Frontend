export default function DashboardBackgroundAnimation() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#A9F99E] rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-500"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-cyan-300 rounded-full animate-ping delay-300"></div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-[#A9F99E]/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(169,249,158,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(169,249,158,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </div>
  );
}
