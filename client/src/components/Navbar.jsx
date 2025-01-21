const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-900 bg-opacity-75 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-white">
          BrandLogo
        </a>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white transition"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-300 focus:outline-none"
            onClick={() => {
              const menu = document.querySelector('#mobile-menu');
              menu.classList.toggle('hidden');
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden bg-gray-900 bg-opacity-90 md:hidden flex flex-col items-center space-y-4 py-4"
      >
        <a
          href="#features"
          className="text-gray-300 hover:text-white transition"
        >
          Features
        </a>
        <a
          href="#about"
          className="text-gray-300 hover:text-white transition"
        >
          About
        </a>
        <a
          href="#contact"
          className="text-gray-300 hover:text-white transition"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
