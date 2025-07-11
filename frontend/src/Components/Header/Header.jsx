import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../Authentication/UserAuthStore';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const { loading } = useAuthStore()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };

      console.log("hi nacho");
      
      checkAuth(); // Run once on load

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl shadow-blue-900/20">
      {/* <div hidden={!loading}>
      <LoadingSpinner/>
      </div> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Logo - 100% unchanged */}
          <div className="flex-shrink-0 pl-2 md:pl-0">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform transition-all hover:rotate-[30deg] hover:scale-110 duration-300 shadow-lg shadow-blue-500/30">
                <div className="text-white font-bold text-2xl h-full w-full flex items-center justify-center">SP`s</div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Blog
              </span>
            </div>
          </div>

          {/* Desktop Navigation - 100% unchanged */}
          <div className={`hidden md:flex ${isMdScreen ? 'mx-4' : 'absolute left-1/2 -translate-x-1/2'}`}>
            <div className="flex gap-14">
              <Link to="" className="group relative text-gray-300 hover:text-white transition-colors duration-300">
                <span className={`text-lg ${isMdScreen ? 'text-base' : ''} font-medium`}>Home</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></div>
              </Link>
              <Link to="/about" className="group relative text-gray-300 hover:text-white transition-colors duration-300">
                <span className={`text-lg ${isMdScreen ? 'text-base' : ''} font-medium`}>About</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-400 transition-all group-hover:w-full"></div>
              </Link>
              <Link to="/contact" className="group relative text-gray-300 hover:text-white transition-colors duration-300">
                <span className={`text-lg ${isMdScreen ? 'text-base' : ''} font-medium`}>Contact</span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></div>
              </Link>
            </div>
          </div>

          {/* Auth Buttons - Only changed section */}
          <div className="hidden md:flex items-center gap-8">
            {isLoggedIn ? (
              <>
                <Link to="/write-blog" className={`px-9 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white ${isMdScreen ? 'text-base px-7' : 'text-lg'} font-semibold rounded-full transition-transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30`}>
                  Write Blog
                </Link>
                <Link to="/logout" className={`px-7 py-2.5 text-gray-300 hover:text-white ${isMdScreen ? 'text-base px-5' : 'text-lg'} font-medium transition-all hover:bg-white/10 rounded-full backdrop-blur-sm`}>
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className={`px-7 py-2.5 text-gray-300 hover:text-white ${isMdScreen ? 'text-base px-5' : 'text-lg'} font-medium transition-all hover:bg-white/10 rounded-full backdrop-blur-sm`}>
                  Log In
                </Link>
                <Link to="/signup" className={`px-9 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white ${isMdScreen ? 'text-base px-7' : 'text-lg'} font-semibold rounded-full transition-transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30`}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - 100% unchanged */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu - Only changed auth section */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50">
          <div className="px-6 py-8 space-y-10">
            <div className="flex flex-col  gap-10">
              <Link to="/home" className="text-2xl font-medium text-white hover:text-blue-400 transition-colors pl-6 border-l-4 border-blue-500">
                Home
              </Link>
              <Link to="/about" className="text-2xl font-medium text-white hover:text-purple-400 transition-colors pl-6 border-l-4 border-transparent hover:border-purple-500">
                About
              </Link>
              <Link to="/contact" className="text-2xl font-medium text-white hover:text-blue-400 transition-colors pl-6 border-l-4 border-transparent hover:border-blue-500">
                Contact
              </Link>
            </div>

            <div className="pt-12 border-t border-gray-700/50 space-y-8">
              {isLoggedIn ? (
                <>
                  <Link to="/write-blog" className="block w-full text-center px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r 
                    from-blue-500 to-purple-600 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/30 mx-4">
                    Write Blog
                  </Link>
                  <Link to="/logout" className="block w-full text-center px-6 py-4 text-lg font-semibold text-white bg-gray-800/50 
                    rounded-xl hover:bg-gray-700/50 transition-all mx-4">
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signin" className="block w-full text-center px-6 py-4 text-lg font-semibold text-white bg-gray-800/50 
                    rounded-xl hover:bg-gray-700/50 transition-all mx-4">
                    Log In
                  </Link>
                  <Link to="/signup" className="block w-full text-center px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r 
                    from-blue-500 to-purple-600 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/30 mx-4">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;