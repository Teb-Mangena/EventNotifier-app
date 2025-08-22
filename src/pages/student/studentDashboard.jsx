import { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/apiUrl";

const StudentDashboard = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch events
        const eventsResponse = await fetch(apiUrl+'/events', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.data);
        
        // Fetch opportunities
        const oppsResponse = await fetch(apiUrl+'/opportunities', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const oppsData = await oppsResponse.json();
        setOpportunities(oppsData.data);
        
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time range
  const formatTimeRange = (start, end) => {
    const startTime = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${startTime} - ${endTime}`;
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
        <div className="flex-1 p-6 md:p-8 overflow-auto flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />

      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Dashboard Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600">
                  {user.email}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-800">{events.length + opportunities.length}</p>
                <p className="text-gray-600">Total Activities</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-800">{events.length}</p>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-800">{opportunities.length}</p>
                <p className="text-gray-600">Opportunities</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
              <button onClick={() => navigate('/events')} className="text-orange-500 font-medium hover:text-orange-600 cursor-pointer">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {events.length > 0 ? (
                events.map(event => (
                  <div key={event._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150">
                    <div onClick={() => navigate(`/events/${event._id}`)} className="flex justify-between items-center hover:cursor-pointer">
                      <div>
                        <h3 className="font-bold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {formatDate(event.openingDate)} | {formatTimeRange(event.openingDate, event.closingDate)}
                        </p>
                        <p className="text-gray-600 text-sm">{event.location}</p>
                      </div>
                      <button onClick={() => navigate(`/events/${event._id}`)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm transition duration-200 cursor-pointer">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming events found</p>
              )}
            </div>
          </div>

          {/* Volunteer Opportunities Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Volunteer Opportunities</h2>
              <button onClick={() => navigate('/opportunities')} className="text-orange-500 font-medium hover:text-orange-600 cursor-pointer">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commitment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {opportunities.length > 0 ? (
                    opportunities.map(opp => (
                      <tr key={opp._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{opp.title}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {opp.organization}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {opp.commitment}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Available
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                        No volunteer opportunities found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;