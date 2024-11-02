// src/components/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'

export const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) => `
    py-4 px-2 transition-colors duration-200
    ${isActive(path) 
      ? 'text-blue-500 border-b-2 border-blue-500' 
      : 'text-gray-500 hover:text-gray-900'}
  `;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header>
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <span className="font-semibold text-gray-500 text-lg">
                    MyMembership
                  </span>
                </Link>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link to="/schedule" className={linkClass('/schedule')}>
                    Classes
                  </Link>
                  <Link to="/membership" className={linkClass('/membership')}>
                    Membership
                  </Link>
                  <Link to="/training" className={linkClass('/training')}>
                    Training
                  </Link>
                </div>
              </div>

              <div className="flex items-center">
                <button 
                  className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                    />
                  </svg>
                </button>

                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-gray-500 text-sm">
            © 2024 Carved Rock Fitness. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
	children: PropTypes.node
}