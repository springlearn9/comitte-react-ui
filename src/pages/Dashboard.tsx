import React from 'react';
import { useAuth } from '../context/AuthContext';
import MemberDashboard from './comitte'; // index.tsx exports MemberDashboard

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">Member Dashboard</h1>
      <div className="mt-6 border-t pt-6">
        {user ? (
          <div>
            <h2 className="text-xl font-semibold">Welcome, {user.username}!</h2>
            <p className="text-gray-600 mt-2">This is your protected dashboard page.</p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mobile:</strong> {user.mobile || 'N/A'}</p>
              <p><strong>User ID:</strong> {user.id}</p>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/* Member-specific comitte dashboard */}
      <section className="mt-6">
        <MemberDashboard />
      </section>
    </div>
  );
};

export default Dashboard;