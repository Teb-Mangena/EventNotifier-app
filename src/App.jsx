import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EventPage from './pages/EventPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import AboutUsPage from './pages/AboutUsPage';
import EventDetailPage from './pages/EventDetailPage';
import NotificationsPage from './pages/NotificationsPage';
import HelpAndSupportPage from './pages/HelpAndSupportPage';
import ContactUsPage from './pages/ContactUsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EventManagementPage from './pages/Admin/EventManagementPage';
import ManageOpportunitiesPage from './pages/Admin/ManageOpportunitiesPage';
import StudentDashboard from './pages/student/studentDashboard';
import UserManagementPage from './pages/Admin/UserManagementPage';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        

        <Route 
          path="/support" 
          element={<HelpAndSupportPage />} 
        />

        <Route 
          path="/about" 
          element={<AboutUsPage />} 
        />

        <Route 
          path="/contact" 
          element={<ContactUsPage />} 
        />

        {/* AUTH ROUTES */}
          <Route 
            index 
            element={
              !user ? (
                <HomePage />
              ) : user.role === 'user' ? ( 
                <Navigate to='/student-dashboard' />
              ) : (
                <Navigate to='/admin-dashboard' />
              )
            } 
          />

        <Route
          path="/login"
          element={
            !user ? (
            <LoginPage /> 
            ) : user.role === "admin" ? (
              <Navigate to='/admin-dashboard' />
            ) : (
              <Navigate to='/student-dashboard' />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !user ? <SignupPage /> 
            : <Navigate to="/student-dashboard"/>
          }
        />

        {/* USER ROUTES */}
        <Route 
          path='/student-dashboard'
          element={
            user && user.role === 'user' ? <StudentDashboard /> : <Navigate to='/login'/>
          }
        />

        <Route
          path="/events"
          element={
            user && user.role === 'user' ? <EventPage /> :
            <Navigate to="/login"/>
          }
        />
        <Route
          path="/opportunities"
          element={
            user && user.role === 'user' ? <OpportunitiesPage /> 
            : <Navigate to="/login" />
          }
        />
        <Route
          path="/notifications"
          element={
            user && user.role === 'user' ? <NotificationsPage /> 
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/profile"
          element={
            user && user ? <ProfilePage /> 
            : <Navigate to="/login"/>
          }
        />
        
        
        <Route
          path="/events/:eventId"
          element={
            user && user.role === 'user' ? <EventDetailPage /> 
            : <Navigate to="/login"/>
          }
        />
        
        {/* ADMIN ROUTES */}
        <Route
          path="/admin-dashboard"
          element={
            user && user.role === "admin" 
              ? <AdminDashboard /> 
              : <Navigate to="/login"/>
          }
        />
        
        <Route
          path="/event-management"
          element={ 
            user && user.role === 'admin' 
              ? <EventManagementPage /> 
              : <Navigate to="/login" />  
          }
        />

        <Route
          path="/opportunity-management"
          element={
            user && user.role === 'admin' 
              ? <ManageOpportunitiesPage /> 
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/user-management"
          element={
            user && user.role === 'admin' 
              ? <UserManagementPage /> 
              : <Navigate to="/login" />
          }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;