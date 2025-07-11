const Contact = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Contact Information */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                Get in Touch
              </h1>
  
              <div className="space-y-6">
                {/* Email Card */}
                <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm">Email</h3>
                      <a href="mailto:dhiraj99909@gmail.com" className="text-xl font-medium text-white hover:text-blue-400 transition-colors">
                        dhiraj99909@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
  
                {/* Social Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* GitHub Card */}
                  <a 
                    href="https://github.com/dhirajCodes543" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <svg className="h-8 w-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">GitHub</h3>
                        <p className="text-xl font-medium text-white">@dhirajCodes543</p>
                      </div>
                    </div>
                  </a>
  
                  {/* Instagram Card */}
                  <a 
                    href="https://instagram.com/ddra890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-pink-500/20 rounded-lg">
                        <svg className="h-8 w-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Instagram</h3>
                        <p className="text-xl font-medium text-white">@ddra890</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
  
            {/* Decorative Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative group h-96 rounded-3xl overflow-hidden border-2 border-gray-700/50 hover:border-blue-400/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm" />
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800"
                  alt="Contact"
                  className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 backdrop-blur-lg bg-gray-900/50 rounded-2xl">
                    <h3 className="text-2xl font-bold text-white mb-4">Let's Create Something Amazing!</h3>
                    <p className="text-gray-300">Available for collaborations and new projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Contact;