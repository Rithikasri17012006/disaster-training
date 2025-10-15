import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import DonorDashboard from './components/Donor/DonorDashboard';
import NGODashboard from './components/NGO/NGODashboard';
import CitizenDashboard from './components/Citizen/CitizenDashboard';
import PWAInstall from './components/PWAInstall';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (!isAuthenticated) {
    return showSignup ? (
      <Signup onToggleAuth={() => setShowSignup(false)} />
    ) : (
      <Login onToggleAuth={() => setShowSignup(true)} />
    );
  }

  return (
    <>
      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'donor' && <DonorDashboard />}
      {user?.role === 'ngo' && <NGODashboard />}
      {user?.role === 'citizen' && <CitizenDashboard />}
      {!user?.role && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p>Invalid role</p>
        </div>
      )}
      <PWAInstall />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
