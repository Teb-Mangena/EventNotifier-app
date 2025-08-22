import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to WSU EventNotifier</h1>
              <p className="text-gray-600 text-lg mb-6">
                Join our platform to discover opportunities, community events, 
                and connect with like-minded individuals making a difference.
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                  Register Now
                </button>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="bg-orange-100 text-orange-500 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                  📅
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Community Events</h3>
                <p className="text-gray-600 text-sm">
                  Discover and participate in local events that bring people together.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="bg-blue-100 text-blue-500 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                  💼
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Volunteer Opportunities</h3>
                <p className="text-gray-600 text-sm">
                  Find meaningful ways to contribute your time and skills to good causes.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="bg-green-100 text-green-500 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-2xl">
                  👥
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Build Connections</h3>
                <p className="text-gray-600 text-sm">
                  Meet others who share your interests and passion for community service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default HomePage;