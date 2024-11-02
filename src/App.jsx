// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ClassSchedule } from './features/class-schedule/ClassSchedule';
import { MembershipManagement } from './features/membership/MembershipManagement';
import { PersonalTraining } from './features/training/PersonalTraining';

// Home component
const Home = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome to MyMembership
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Class Schedule</h2>
          <p className="text-gray-600 mb-4">
            Browse and book fitness classes that fit your schedule.
          </p>
          <a 
            href="/schedule" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            View Schedule
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Membership</h2>
          <p className="text-gray-600 mb-4">
            Manage your membership and explore available tiers.
          </p>
          <a 
            href="/membership" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            View Membership
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Training</h2>
          <p className="text-gray-600 mb-4">
            Book sessions with our expert personal trainers.
          </p>
          <a 
            href="/training" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            View Training
          </a>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Updates</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></span>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">New HIIT Classes Added</h3>
                <p className="text-gray-600">Check out our new high-intensity interval training classes, now available for booking.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></span>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Holiday Hours</h3>
                <p className="text-gray-600">View our updated schedule for the upcoming holiday season.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></span>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">New Personal Trainers</h3>
                <p className="text-gray-600">Welcome our new certified trainers specializing in strength training and rehabilitation.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<ClassSchedule />} />
          <Route path="/membership" element={<MembershipManagement />} />
          <Route path="/training" element={<PersonalTraining />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;