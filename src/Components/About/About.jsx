const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Profile Image */}
          <div className="relative group group w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 opacity-80 blur-xl" />
            <img
              src="your-image-url.jpg"
              alt="Your Name"
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-800 transform transition-all duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="max-w-3xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              About Me
            </h1>

            <div className="space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                Hi, I'm <span className="text-blue-400 font-medium"><b>Subhodeep Paramanik</b></span>, a passionate
                <span className="text-purple-400"> living being</span> with expertise in creating
                beautiful and functional digital experience .
              </p>

              <p className="text-gray-400 leading-relaxed"> Life, to me, is the grandest adventure — a journey where every path, turn, and moment offers something to explore. I'm a wanderer in all directions: from the realms of code and digital creation to the silence of meditation, from savoring street food to seeking the untamed beauty of distant landscapes. Whether I’m building software, reflecting under the stars, or simply sharing a laugh over a good meal, I embrace life fully — as a developer, a dreamer, a spiritual seeker, and a traveler at heart. </p>

              <p className="text-gray-400 leading-relaxed"> I believe we are heading into times where compassion, creativity, and collaboration will matter more than ever. From environmental challenges to technological ethics, the world needs thinkers, builders, and believers who want to make a difference. My mission is to contribute through my work, my voice, and my actions — to make the world not just smarter, but kinder. Alone, we can only do so much. Together, we can reshape futures. </p>

              <p className="text-gray-400 leading-relaxed"> If you're someone who also feels this pull — to explore, to create, and to serve something bigger than yourself — I invite you to join me. Let's share ideas, build tools, create stories, and grow through our differences. This journey of life is vast, unpredictable, and beautiful — and it's so much better when traveled together. </p>
              
            </div>

            {/* Social Links (Optional) */}
            <div className="mt-8 flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* GitHub SVG path */}
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* LinkedIn SVG path */}
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;