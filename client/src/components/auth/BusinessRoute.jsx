import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const BusinessRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b67a]"></div>
      </div>
    );
  }

  // Check if user is logged in and has companyOwner or admin role
  if (!user || (user.role !== 'companyOwner' && user.role !== 'admin')) {
    return <Navigate to="/business" />;
  }

  return <Outlet />;
};

export default BusinessRoute;
