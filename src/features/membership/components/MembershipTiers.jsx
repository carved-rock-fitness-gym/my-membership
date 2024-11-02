// src/features/membership/components/MembershipTiers.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const MembershipTiers = ({ onTierSelect }) => {
  const tiers = [
    {
      name: 'Basic',
      price: 29.99,
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment',
        'Gym floor orientation'
      ]
    },
    {
      name: 'Premium',
      price: 49.99,
      features: [
        'All Basic features',
        '2 free classes/month',
        'Nutrition consultation',
        'Personalized workout plan'
      ]
    },
    {
      name: 'Elite',
      price: 89.99,
      features: [
        'All Premium features',
        'Unlimited classes',
        '1 PT session/month',
        'Access to all locations'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <div 
          key={tier.name}
          className={`p-6 rounded-lg shadow-lg border-2 ${
            tier.name === 'Premium' ? 'border-blue-500 relative' : 'border-transparent'
          }`}
        >
          {tier.name === 'Premium' && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </span>
          )}
          
          <h3 className="text-xl font-bold">{tier.name}</h3>
          <p className="mt-2">
            <span className="text-3xl font-bold">${tier.price}</span>
            <span className="text-gray-500">/month</span>
          </p>
          
          <ul className="mt-6 space-y-4">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => onTierSelect(tier)}
            className={`mt-8 w-full py-2 px-4 rounded-md font-medium ${
              tier.name === 'Premium'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-800 text-white hover:bg-gray-900'
            }`}
          >
            Select {tier.name}
          </button>
        </div>
      ))}
    </div>
  );
};

MembershipTiers.propTypes = {
  onTierSelect: PropTypes.func.isRequired
};