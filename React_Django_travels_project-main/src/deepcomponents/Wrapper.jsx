import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Wrapper = ({ token, handleLogout, children }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side navigation */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
                <span className="text-xl font-bold">Spring Travels</span>
              </Link>
              
              {token && (
                <Link 
                  to='/my-bookings' 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  My Bookings
                </Link>
              )}
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
              {token ? (
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Register
                  </Link>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white shadow-sm rounded-lg p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Wrapper;