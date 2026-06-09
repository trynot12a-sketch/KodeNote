import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SnippetProvider, useSnippets } from './context/SnippetContext';
import Sidebar from './components/Sidebar';
import Notification from './components/Notification';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SnippetForm from './pages/SnippetForm';
import SnippetDetail from './pages/SnippetDetail';
import Search from './pages/Search';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const { notification, setNotification } = useSnippets();

  return (
    <div className="flex bg-dark-bg min-h-screen text-dark-text">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {isAuthenticated && <Sidebar />}
      <main className={isAuthenticated ? "flex-1 p-8" : "w-full"}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><SnippetForm /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><SnippetForm /></PrivateRoute>} />
          <Route path="/snippet/:id" element={<PrivateRoute><SnippetDetail /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SnippetProvider>
          <AppContent />
        </SnippetProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
