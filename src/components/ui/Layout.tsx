import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-primary-dark text-white'
        : 'text-gray-300 hover:bg-primary-dark hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-white font-bold text-xl">
                ComitteApp
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <NavLink to="/dashboard" className={navLinkClass}>
                      Dashboard
                    </NavLink>
                    <div className="text-white flex items-center">
                      <UserIcon className="h-5 w-5 mr-1" />
                      <span>{user?.username}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center text-gray-300 hover:bg-primary-dark hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <LogOut className="h-5 w-5 mr-1" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClass}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className={navLinkClass}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-dark focus:outline-none"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-dark">
                    Dashboard
                  </NavLink>
                  <div className="text-gray-300 px-3 py-2">{user?.username}</div>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary-dark"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary-dark">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary-dark">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;