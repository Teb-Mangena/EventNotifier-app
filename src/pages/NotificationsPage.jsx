import SideBar from "../components/SideBar";

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: "New Event Added",
      message: "The 'Cancer Awareness' event has been scheduled for August 11. Register now!",
      time: "10 minutes ago",
      read: false,
      type: "event"
    },
    {
      id: 2,
      title: "Registration Confirmed",
      message: "Your registration for 'Prayer Session' on August 14 has been confirmed.",
      time: "2 hours ago",
      read: true,
      type: "registration"
    },
    {
      id: 3,
      title: "Reminder",
      message: "Don't forget about the community meeting tomorrow at 2 PM in the Great Hall.",
      time: "1 day ago",
      read: true,
      type: "reminder"
    },
    {
      id: 4,
      title: "System Update",
      message: "We've updated our platform with new features. Check out what's new!",
      time: "2 days ago",
      read: true,
      type: "system"
    },
    {
      id: 5,
      title: "New Message",
      message: "You have received a new message from Pastor David regarding the upcoming retreat.",
      time: "3 days ago",
      read: false,
      type: "message"
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch(type) {
      case 'event':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'registration':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'message':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600">Stay updated with recent activities</p>
            </div>
            <button className="text-orange-500 hover:text-orange-600 font-medium">
              Mark all as read
            </button>
          </div>

          <div className="mb-4 flex items-center">
            <span className="bg-orange-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
              {unreadCount}
            </span>
            <span className="text-sm font-medium text-gray-700">Unread notifications</span>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-gray-500">When you have new notifications, they'll appear here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`px-6 py-4 hover:bg-gray-50 ${!notification.read ? 'bg-orange-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-1 mr-4">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                            {notification.time}
                          </p>
                        </div>
                        <p className={`text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-500'}`}>
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <button className="mt-2 text-xs text-orange-600 hover:text-orange-700 font-medium">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Previous
            </button>
            <span>Page 1 of 1</span>
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;