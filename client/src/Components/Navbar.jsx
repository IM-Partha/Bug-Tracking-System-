import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(() => localStorage.getItem('username'));

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      setUsername(token && storedUsername ? storedUsername : null);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-[#3498db] text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">Issue Tracker</Link>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`flex-col md:flex-row md:flex gap-4 absolute md:static w-full md:w-auto left-0 top-16 md:top-0 
            ${menuOpen ? 'flex' : 'hidden'} md:flex
            bg-white text-blue-600 md:bg-transparent md:text-white shadow-md md:shadow-none p-4 md:p-0
            items-start md:items-center
          `}
        >
          <Link
            to="/projects"
            className="px-4 py-2 rounded w-full md:w-auto text-center hover:bg-blue-500 hover:text-white transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            to="/issues"
            className="px-4 py-2 rounded w-full md:w-auto text-center hover:bg-blue-500 hover:text-white transition-colors duration-200"
          >
            Issues
          </Link>

          {username ? (
            <>
              <span className="px-4 py-2 font-semibold w-full md:w-auto text-center">{username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded text-white w-full md:w-auto text-center hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded w-full md:w-auto text-center hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded w-full md:w-auto text-center hover:bg-blue-700 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
