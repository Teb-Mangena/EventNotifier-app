import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[Navbar] user:', user);
  }, [user]);

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // helper for desktop link styling
  const desktopLinkClass = (path) => {
    const isActive = location.pathname === path;
    return [
      'cursor-pointer transition-colors',
      isActive
        ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
        : 'text-gray-700 hover:text-orange-400',
    ].join(' ');
  };

  // helper for mobile link styling
  const mobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    return [
      'py-3 px-4 transition-colors',
      isActive
        ? 'bg-gray-100 text-orange-400'
        : 'text-gray-700 hover:bg-gray-50 hover:text-orange-400',
    ].join(' ');
  };

  return (
    <nav className="relative flex justify-between items-center border-b border-gray-300 hover:shadow-sm px-4 py-3 bg-white z-20">
      {/* LEFT */}
      <Link to="/" onClick={closeMenu}>
        <h1 className="font-extrabold cursor-pointer text-xl md:text-2xl">
          WSU <span>EventNotifier</span>
        </h1>
      </Link>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex space-x-6">
          {navLinks.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                onClick={closeMenu}
                className={desktopLinkClass(path)}
              >
                {name}
              </Link>
            </li>
          ))}

          {user ? (
            <li
              onClick={handleLogout}
              className="cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
            >
              Logout
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="cursor-pointer text-gray-700 hover:text-orange-400 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="cursor-pointer text-gray-700 hover:text-orange-400 transition-colors"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        {user && (
          <button
            aria-label="Profile"
            onClick={()=> navigate("/profile")}
            className="ml-4 p-1 text-gray-500 hover:text-orange-400 hover:cursor-pointer focus:outline-none"
          >
            {/* Profile SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0Z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center space-x-4">
        {user && (
          <button
            aria-label="Profile"
            className="p-1 text-gray-500 hover:text-orange-400 focus:outline-none"
            onClick={closeMenu}
          >
            {/* Same Profile SVG */}
            <Link to='/profile'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0Z"
                />
              </svg>
            </Link>
          </button>
        )}

        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className="p-1 text-gray-500 hover:text-orange-400 focus:outline-none transition-colors"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg z-10">
          <ul className="flex flex-col">
            {navLinks.map(({ name, path }) => (
              <Link key={name} to={path} onClick={closeMenu}>
                <li className={mobileLinkClass(path)}>{name}</li>
              </Link>
            ))}

            {user ? (
              <li
                onClick={handleLogout}
                className="py-3 px-4 cursor-pointer hover:bg-gray-50 hover:text-red-500 transition-colors"
              >
                Logout
              </li>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <li className={['py-3 px-4 cursor-pointer hover:bg-gray-50 hover:text-orange-400 transition-colors'].join(' ')}>
                    Login
                  </li>
                </Link>
                <Link to="/signup" onClick={closeMenu}>
                  <li className={['py-3 px-4 cursor-pointer hover:bg-gray-50 hover:text-orange-400 transition-colors'].join(' ')}>
                    Signup
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
