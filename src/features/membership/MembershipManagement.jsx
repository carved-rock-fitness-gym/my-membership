import React, { useState } from 'react';
import { MembershipTiers } from './components/MembershipTiers';
import { PaymentForm } from './components/PaymentForm';
import { MembershipCard } from './components/MembershipCard';

export const MembershipManagement = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Membership Management</h1>
      <MembershipTiers
        onTierSelect={(tier) => {
          setSelectedTier(tier);
          setShowPaymentForm(true);
        }}
      />
      {selectedTier && (
        <>
          <MembershipCard tier={selectedTier} />
          {showPaymentForm && (
            <PaymentForm 
              tier={selectedTier}
              onSuccess={() => setShowPaymentForm(false)}
            />
          )}
        </>
      )}
    </div>
  );
};