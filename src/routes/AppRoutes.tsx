import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import RequestReset from '../pages/Auth/RequestReset';
import ResetPassword from '../pages/Auth/ResetPassword';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ui/ProtectedRoute';
import Layout from '../components/ui/Layout';
import { useAuth } from '../context/AuthContext';
import ComitteView from '../pages/comitte/ComitteView';
import ComitteEdit from '../pages/comitte/ComitteEdit';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request-password-reset" element={<RequestReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Comitte pages */}
        <Route path="/comittes/:id" element={<ComitteView />} />
        <Route path="/comittes/:id/edit" element={<ComitteEdit />} />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;