import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if the user has a token in localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If the token exists, allow them to see the page (children)
  return children;
}

