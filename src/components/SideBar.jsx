import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const SidebarIcon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {children}
  </svg>
);

function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const toggleSidebar = () => setIsExpanded(prev => !prev);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define menu items based on user role
  const userMenuItems = [
    { 
      name: 'Dashboard', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
      path: '/student-dashboard'
    },
    { 
      name: 'Events', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
      path: '/events'
    },
    { 
      name: 'Opportunities', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
      path: '/opportunities'
    },
    { 
      name: 'Notifications', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      ),
      path: '/notifications'
    },
  ];

  const adminMenuItems = [
    { 
      name: 'Dashboard', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
      path: '/admin-dashboard'
    },
    { 
      name: 'Events', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      ),
      path: '/event-management'
    },
    { 
      name: 'Opportunities', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      ),
      path: '/opportunity-management'
    },
    { 
      name: 'Users', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
      path: '/user-management'
    },
  ];

  const commonMenuItems = [
    { 
      name: 'Profile', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      path: '/profile'
    },
    { 
      name: 'Help & Support', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      path: '/support'
    },
    { 
      name: 'Logout', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      ),
      isLogout: true
    }
  ];

  // Combine menu items based on user role
  const menuItems = [
    ...(user.role === 'admin' ? adminMenuItems : userMenuItems),
    ...commonMenuItems
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-300 transition-all duration-300 z-10 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        {isExpanded && (
          <div className="font-extrabold text-xl">
            {user.role === 'admin' ? 'Admin Panel' : 'Student Dashboard'}
          </div>
        )}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-1 text-gray-500 hover:text-orange-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isExpanded ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>

      <nav className="mt-4">
        <ul className="space-y-1">
          {menuItems.map(item => {
            const isActive = !item.isLogout && location.pathname === item.path;

            const baseClasses = `flex items-center p-3 w-full ${
              isExpanded ? 'px-4' : 'justify-center'
            } transition-colors`;

            const activeClasses = isActive
              ? 'bg-orange-100 text-orange-500'
              : 'text-gray-700 hover:bg-gray-50 hover:text-orange-400';

            return (
              <li key={item.name}>
                {item.isLogout ? (
                  <button
                    onClick={handleLogout}
                    className={`${baseClasses} ${activeClasses} hover:text-red-500`}
                  >
                    <SidebarIcon>{item.icon}</SidebarIcon>
                    {isExpanded && <span className="ml-3">{item.name}</span>}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`${baseClasses} ${activeClasses}`}
                  >
                    <SidebarIcon>{item.icon}</SidebarIcon>
                    {isExpanded && <span className="ml-3">{item.name}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;