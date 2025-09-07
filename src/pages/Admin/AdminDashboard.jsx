import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  const recentActivities = [
    { id: 1, user: "Thabisa Nkosi", action: "created new event", time: "10 min ago" },
    { id: 2, user: "Sipho Dlamini", action: "updated profile", time: "25 min ago" },
    { id: 3, user: "Lerato Mbeki", action: "registered for workshop", time: "1 hour ago" },
    { id: 4, user: "Nomalanga Zulu", action: "applied for bursary", time: "2 hours ago" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      
      <main className="flex-1 p-6 overflow-auto">
        {/* Modern Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with EventNotifier today.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8"></div>
                <span className="font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
          
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ActionCard 
                  title="Users" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                  color="blue"
                  link="/user-management"
                />
                
                <ActionCard 
                  title="Events" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  color="green"
                  link="/event-management"
                />
                
                <ActionCard 
                  title="Opportunities" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  }
                  color="purple"
                  link="/opportunity-management"
                />
                
                <ActionCard 
                  title="Event Registered students" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                  color="orange"
                  link="/event-list"
                />
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Full Log
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start py-2 border-b border-gray-100 last:border-0">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.user}</p>
                      <p className="text-gray-600">{activity.action}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">System Status</h2>
              
              <div className="space-y-4">
                <StatusItem 
                  title="Server Uptime" 
                  value="99.98%" 
                  status="operational" 
                />
                <StatusItem 
                  title="Database" 
                  value="Normal" 
                  status="operational" 
                />
                <StatusItem 
                  title="API Response" 
                  value="142ms" 
                  status="operational" 
                />
                <StatusItem 
                  title="Storage" 
                  value="78% used" 
                  status="warning" 
                />
              </div>
              
              <button className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors">
                View System Report
              </button>
            </div>
            
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Tasks</h2>
              
              <div className="space-y-4">
                <TaskItem 
                  title="Review new event submissions" 
                  due="Today" 
                  priority="high"
                />
                <TaskItem 
                  title="Update privacy policy" 
                  due="Tomorrow" 
                  priority="medium"
                />
                <TaskItem 
                  title="Generate monthly report" 
                  due="Jun 15" 
                  priority="low"
                />
              </div>
              
              <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <p className="text-xs text-green-600 mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ title, icon, color, link }) => {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  };
  
  return (
    <Link 
      to={link}
      className="group flex flex-col items-center text-center p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all"
    >
      <div className={`p-3 rounded-full ${colorClasses[color]} transition-colors`}>
        {icon}
      </div>
      <h3 className="font-medium text-gray-800 mt-3 group-hover:text-blue-600">{title}</h3>
    </Link>
  );
};

// Status Item Component
const StatusItem = ({ title, value, status }) => {
  const statusColors = {
    operational: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500'
  };
  
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-3 ${statusColors[status]}`}></div>
        <span className="text-gray-700">{title}</span>
      </div>
      <span className="text-gray-600 font-medium">{value}</span>
    </div>
  );
};

// Task Item Component
const TaskItem = ({ title, due, priority }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
  };
  
  const priorityText = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };
  
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-gray-600 text-sm">Due: {due}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[priority]}`}>
        {priorityText[priority]}
      </span>
    </div>
  );
};

export default AdminDashboard;