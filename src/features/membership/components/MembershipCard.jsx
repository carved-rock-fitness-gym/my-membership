// src/features/membership/components/MembershipCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const MembershipCard = ({ tier }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Digital Membership Card</h3>
          <p className="text-sm text-gray-500 mt-1">Carved Rock Fitness</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${tier.name === 'Elite' ? 'bg-purple-100 text-purple-800' : 
            tier.name === 'Premium' ? 'bg-blue-100 text-blue-800' : 
            'bg-gray-100 text-gray-800'}`}>
          {tier.name}
        </span>
      </div>
      
      <div className="mt-6">
        <div className="border-t border-gray-200 py-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Member Since</span>
            <span className="text-sm font-medium text-gray-900">January 2024</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Next Payment</span>
            <span className="text-sm font-medium text-gray-900">${tier.price}/month</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Member ID</span>
            <span className="text-sm font-medium text-gray-900">#CR{Math.floor(Math.random() * 10000)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex space-x-4">
          <img 
            src="/api/placeholder/100/100"
            alt="QR Code"
            className="w-24 h-24"
          />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">Quick Access</h4>
            <p className="text-sm text-gray-500 mt-1">
              Show this QR code at the gym entrance for quick access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MembershipCard.propTypes = {
	tier: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	}).isRequired
}



