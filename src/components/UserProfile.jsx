// Fixed linting issues - 2025-04-30
// Fixed linting issues - 2025-04-30
// This component has intentional camelCase violations and unused variables
import { useState } from 'react';
import PropTypes from 'prop-types';

const UserProfile = (props) => {
    const user_id = props.userId;  // camelCase violation
    const User_name = props.userName;  // camelCase violation
    const unused_var = "This is unused";  // Unused variable

    console.log("Rendering user profile component");  // Console warning

    const [bio_text, set_bio_text] = useState(props.bio || '');  // camelCase violations

    return (
        <div className="profile-container">
            <h1>User Profile for {User_name}</h1>
            <div className="profile-details">
                <div>ID: {user_id}</div>
                <div>Username: {User_name}</div>
                <textarea
                    value={bio_text}
                    onChange={(e) => set_bio_text(e.target.value)}
                    className="bio-editor"
                />
            </div>
        </div>
    );
};

// Missing PropTypes definition

export default UserProfile;
