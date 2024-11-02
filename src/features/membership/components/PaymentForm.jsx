// src/features/membership/components/PaymentForm.jsx
import React, { useState } from 'react';
import { validationUtils } from '../../../utils/validation';
import PropTypes from 'prop-types'

export const PaymentForm = ({ tier, onSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    const newErrors = {};
    if (!validationUtils.isValidCreditCard(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!formData.cvv.match(/^[0-9]{3,4}$/)) {
      newErrors.cvv = 'Invalid CVV';
    }
    if (!validationUtils.isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    // Process payment
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess();
    } catch (error) {
      setError('Payment processing failed. Please try again: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-4">Payment Details</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">${tier.price}/month</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="MM/YY"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="123"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="john@example.com"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-medium text-white 
              ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
	tier: PropTypes.shape({
		price: PropTypes.number.isRequired
	}).isRequired,
	onSuccess: PropTypes.func.isRequired
}

export default PaymentForm