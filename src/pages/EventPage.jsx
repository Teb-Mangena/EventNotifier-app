import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { apiUrl } from "../api/apiUrl";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [totalEvents, setTotalEvents] = useState(0);

  // Function to determine event status
  const getEventStatus = (openingDate, closingDate) => {
    const now = new Date();
    const start = new Date(openingDate);
    const end = new Date(closingDate);
    
    if (now < start) {
      return "upcoming";
    } else if (now >= start && now <= end) {
      return "open";
    } else {
      return "closed";
    }
  };

  // Get status badge with appropriate styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: {
        text: "Upcoming",
        className: "bg-orange-100 text-orange-700"
      },
      open: {
        text: "Open",
        className: "bg-green-100 text-green-700"
      },
      closed: {
        text: "Closed",
        className: "bg-gray-100 text-gray-700"
      }
    };
    
    const config = statusConfig[status] || statusConfig.upcoming;
    
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.className}`}>
        {config.text}
      </span>
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const skip = (currentPage - 1) * eventsPerPage;
        const response = await fetch(
          `${apiUrl}/events?limit=${eventsPerPage}&skip=${skip}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setEvents(result.data);
        setTotalEvents(result.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchEvents();
  }, [currentPage, eventsPerPage]);

  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const formatEventDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = startDate.toLocaleDateString(undefined, dateOptions);
    
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const startTime = startDate.toLocaleTimeString(undefined, timeOptions);
    const endTime = endDate.toLocaleTimeString(undefined, timeOptions);
    
    return `${formattedDate} ${startTime} - ${endTime}`;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-6 md:p-8 overflow-auto flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-full 
                border-t-transparent animate-spin"></div>
            </div>
            <p className="text-orange-500 font-medium">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              <p className="font-bold">Error loading events</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Events</h1>
          <p className="text-gray-600 mb-6">Discover and join our activities</p>

          <div className="space-y-6">
            {events.length === 0 ? (
              <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg">
                <p>No events found</p>
              </div>
            ) : (
              events.map((event) => {
                const formattedDate = formatEventDate(
                  event.openingDate,
                  event.closingDate
                );
                
                const startDate = new Date(event.openingDate);
                const day = startDate.getDate();
                const month = startDate.toLocaleString('default', { month: 'short' });
                
                // Determine event status
                const status = getEventStatus(event.openingDate, event.closingDate);
                
                return (
                  <div 
                    key={event._id}
                    className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                      status === 'closed' ? 'border-gray-200 opacity-80' : 'border-gray-200'
                    }`}
                  >
                    <Link to={`/events/${event._id}`}>
                      {event.image && event.image.url && (
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={event.image.url} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          {status === 'closed' && (
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <span className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                Event Ended
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start">
                          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                            <div className={`rounded-lg w-16 h-16 flex flex-col items-center justify-center ${
                              status === 'open' 
                                ? 'bg-green-100 text-green-800' 
                                : status === 'closed'
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              <span className="font-bold text-lg">{day}</span>
                              <span className="text-sm">{month}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>
                              {getStatusBadge(status)}
                            </div>
                            
                            <div className="space-y-3 mt-3">
                              <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formattedDate}</span>
                              </div>
                              
                              <div className="flex items-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{event.location}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-gray-700 line-clamp-2">{event.description}</p>
                            </div>
                            
                            <div className="mt-6 flex space-x-3">
                              <button 
                                className={`font-medium py-2 px-4 rounded-lg transition duration-200 ${
                                  status === 'open'
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                    : status === 'upcoming'
                                    ? 'bg-orange-300 text-white cursor-not-allowed'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                disabled={status !== 'open'}
                              >
                                {status === 'open' 
                                  ? 'Register Now' 
                                  : status === 'upcoming' 
                                  ? 'Registration Opening Soon' 
                                  : 'Registration Closed'}
                              </button>
                              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-200">
                                Add to Calendar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-orange-600 hover:bg-orange-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === page
                          ? "bg-orange-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-orange-600 hover:bg-orange-50"
                }`}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>     
    </div>
  );
}
 
export default EventPage;