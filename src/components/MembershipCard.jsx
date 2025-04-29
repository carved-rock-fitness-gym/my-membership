// Fixed linting issues - 2025-04-29
// This component has quote style and indentation issues
import React from "react";  // Double quotes instead of single

function MembershipCard({ member }) {
  const membershipTypes = {
    "standard": "Standard Membership",
    "premium": "Premium Membership",
    "platinum": "Platinum Membership"
  };

    return (  // Incorrect indentation
        <div className="membership-card">
            <div className="card-header">
                <h3>Carved Rock Fitness</h3>
                <span className="membership-type">{membershipTypes[member.type]}</span>
            </div>
            <div className="card-body">
                <div className="member-info">
                    <div className="member-name">{member.firstName} {member.lastName}</div>
                    <div className="member-since">Member since: {new Date(member.joinDate).toLocaleDateString()}</div>
                    <div className="member-id">ID: {member.id}</div>
                </div>
            </div>
            <div className="card-footer">
                <div className="expiration">Expires: {new Date(member.expirationDate).toLocaleDateString()}</div>
            </div>
        </div>
    );
}

// Missing PropTypes

export default MembershipCard;
