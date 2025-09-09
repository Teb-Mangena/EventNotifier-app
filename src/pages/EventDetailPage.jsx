import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { apiUrl } from "../api/apiUrl";
import { useAuthContext } from "../hooks/useAuthContext";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registartionErrMssg,setRegistartionErrMssg]=useState(null);
  const { user } = useAuthContext();
  const token = user?.token;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        
        // Check if ID is valid before making the request
        if (!eventId || eventId === "undefined") {
          throw new Error("Invalid event ID");
        }
        
        const response = await fetch(`${apiUrl}/events/${eventId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Event not found");
          }
          throw new Error(`Failed to fetch event: ${response.status}`);
        }
        
        const eventData = await response.json();
        setEvent(eventData);
        
        // Fetch related events
        const eventsResponse = await fetch(apiUrl + "/events?limit=3");
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json();
          setRelatedEvents(eventsData.data.filter(e => e._id !== eventId));
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Check if event date has passed
  const isEventPassed = () => {
    if (!event) return true;
    const eventEndDate = new Date(event.closingDate);
    const currentDate = new Date();
    return eventEndDate < currentDate;
  };


  const handleRegister = async () => {
    setIsRegistering(true);
    try {

      const response = await fetch(`${apiUrl}/event-register/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setRegistrationStatus("success");
        setTimeout(() => {
          setShowModal(false);
          setRegistrationStatus(null);
        }, 1500);
      } else {
        setRegistrationStatus("error");
        setRegistartionErrMssg(data.message || "Registration failed");
      }
    } catch (err) {
      setRegistrationStatus("error");
      console.error("Registration error:", err);
    } finally {
      setIsRegistering(false);
    }
  };

  const formatEventDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Format date (e.g., "August 15, 2025")
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = startDate.toLocaleDateString(undefined, dateOptions);
    
    // Format time (e.g., "10:00 - 12:00")
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const startTime = startDate.toLocaleTimeString(undefined, timeOptions);
    const endTime = endDate.toLocaleTimeString(undefined, timeOptions);
    
    return `${formattedDate} ${startTime} - ${endTime}`;
  };

  const formatDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} min` : ''}`;
    }
    return `${minutes} minutes`;
  };

  const handleAddToCalendar = () => {
    // In a real app, this would generate a calendar file
    alert("Added to your calendar!");
  };

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
      .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Registration Modal Component
  const RegistrationModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          {registrationStatus === "success" ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-4">You've successfully registered for this event.</p>
            </div>
          ) : registrationStatus === "error" ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Registration Failed</h3>
              <p className="text-gray-600 mb-4">{registartionErrMssg}.</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  setRegistrationStatus(null);
                }}
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Registration</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to register for "{event.title}"?</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium"
                  disabled={isRegistering}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegister}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium disabled:bg-orange-300"
                  disabled={isRegistering}
                >
                  {isRegistering ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
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
            <p className="text-orange-500 font-medium">Loading event details...</p>
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
            <div className="bg-red-50 text-red-700 p-6 rounded-lg">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-bold text-lg">Error loading event</p>
                  <p className="mt-1">{error}</p>
                  <div className="mt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button 
                      onClick={() => navigate(-1)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
                    >
                      Go Back
                    </button>
                    <button 
                      onClick={() => navigate("/events")}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                    >
                      Browse All Events
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-bold text-lg">Event Not Found</p>
                  <p className="mt-1">The event you're looking for doesn't exist or has been removed.</p>
                  <button 
                    onClick={() => navigate("/events")}
                    className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Browse All Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const startDate = new Date(event.openingDate);
  const day = startDate.getDate();
  const month = startDate.toLocaleString('default', { month: 'short' });
  const weekday = startDate.toLocaleString('default', { weekday: 'long' });
  
  const formattedDate = formatEventDate(event.openingDate, event.closingDate);
  const duration = formatDuration(event.openingDate, event.closingDate);

  const eventPassed = isEventPassed();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-orange-600 font-medium hover:underline mb-6 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to all events
          </button>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Event Header with Image */}
            <div 
              className="relative p-6 md:p-8 bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${event.image?.url})` }}
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-start">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="bg-white text-orange-600 rounded-lg w-16 h-16 flex flex-col items-center justify-center shadow-md">
                    <span className="font-bold text-xl">{day}</span>
                    <span className="text-sm uppercase font-medium">{month}</span>
                  </div>
                </div>
                
                <div className="flex-1 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h1>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full mb-3 md:mb-0 inline-flex items-center ${
                      eventPassed 
                        ? "bg-gray-700 text-gray-200" 
                        : "bg-white bg-opacity-20 text-white"
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        eventPassed ? "bg-gray-400" : "bg-white animate-pulse"
                      }`}></span>
                      {eventPassed ? "Event Ended" : "Upcoming"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center text-white mt-2">
                    <div className="flex items-center mr-6 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center mr-6 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event Details */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Event Details</h2>
                  <div className="prose max-w-none text-gray-700 mb-6">
                    <p>{event.description}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Date & Time</h3>
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{weekday}, {formattedDate}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Location</h3>
                    <div className="flex items-center text-gray-700 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <p className="text-gray-500 mt-2">Map view</p>
                      </div>
                    </div> */}
                    {/* <button className="mt-3 text-orange-600 font-medium hover:underline inline-flex items-center">
                      Get Directions
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button> */}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => !eventPassed && setShowModal(true)}
                      disabled={eventPassed}
                      className={`${
                        eventPassed 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : "bg-orange-500 hover:bg-orange-600"
                      } text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {eventPassed ? "Event Ended" : "Register Now"}
                    </button>
                    
                    <button 
                      onClick={handleAddToCalendar}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Add to Calendar
                    </button>
                    
                    <button 
                      onClick={handleShareEvent}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share Event
                    </button>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-orange-50 rounded-lg p-5 mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Event Organizer</h3>
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-bold">Community Events Team</p>
                        <p className="text-sm text-gray-600 mt-1">events@community.com</p>
                        <p className="text-sm text-gray-600">+27 11 123 4567</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-gray-800 mb-3">Registration Status</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Available spots</span>
                        <span className="text-sm font-medium text-gray-700">23/50</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{width: '46%'}}></div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {eventPassed 
                        ? "This event has already taken place." 
                        : "Register before August 14 to secure your spot. Registration closes 24 hours before the event."
                      }
                    </p>
                    
                    <button 
                      onClick={() => !eventPassed && setShowModal(true)}
                      disabled={eventPassed}
                      className={`w-full ${
                        eventPassed ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                      } text-white font-medium py-2.5 px-4 rounded-lg transition duration-200`}
                    >
                      {eventPassed ? "Event Ended" : "Register Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedEvents.map(relatedEvent => {
                  const formattedDate = formatEventDate(
                    relatedEvent.openingDate,
                    relatedEvent.closingDate
                  );
                  
                  const startDate = new Date(relatedEvent.openingDate);
                  const day = startDate.getDate();
                  const month = startDate.toLocaleString('default', { month: 'short' });
                  
                  return (
                    <Link 
                      to={`/events/${relatedEvent._id}`}
                      key={relatedEvent._id}
                      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex flex-col">
                        <div className="flex-shrink-0 mb-4">
                          <div className="bg-orange-100 text-orange-800 rounded-lg w-14 h-14 flex flex-col items-center justify-center">
                            <span className="font-bold text-base">{day}</span>
                            <span className="text-xs">{month}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{relatedEvent.title}</h3>
                          
                          <div className="space-y-2 mt-3">
                            <div className="flex items-center text-gray-600 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formattedDate}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{relatedEvent.location}</span>
                            </div>
                          </div>
                          
                          <button className="mt-4 text-orange-600 text-sm font-medium hover:underline inline-flex items-center">
                            View details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal />
    </div>
  );
}

export default EventDetailPage;