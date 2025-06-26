import { Link } from 'react-router-dom';
import useAuthStore from '../Authentication/UserAuthStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const GoodbyePage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate()

  const logoutFun = () => {

    const callback = async () => {
      try {
        const res = await axios.get("/api/user/logout")
        console.log("Logged out successfully", res.data.message)
      } catch (error) {
        console.log("Error in logout", error)
      }
    }

    logout(callback)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8 backdrop-blur-lg">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in-up">
        {/* Tear Drop Animation */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-md animate-pulse-slow"></div>
          <div className="relative text-6xl">😢</div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Don't Go Yet...
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We'll miss your stories, your insights, and your presence.
            <span className="block mt-2">Are you sure you want to leave the light of our community?</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={logoutFun}
              className="px-8 py-3 bg-transparent border-2 border-red-400/50 text-red-300 rounded-full 
              hover:bg-red-900/30 transition-all duration-300 text-lg font-medium
              hover:border-red-300 hover:text-red-100 w-full sm:w-auto"
            >
              Yes, I'm Leaving
            </button>

            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-full 
              hover:scale-105 transition-transform duration-300 text-lg font-medium shadow-lg 
              shadow-blue-500/20 w-full sm:w-auto"
            >
              Take Me Back
            </Link>
          </div>
        </div>

        {/* Floating Memories Section */}
        <div className="mt-12 opacity-80">
          <div className="flex items-center justify-center space-x-4 animate-float">
            <span className="text-gray-400">✨</span>
            <span className="text-gray-400 text-sm">Your memories with us...</span>
            <span className="text-gray-400">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodbyePage;