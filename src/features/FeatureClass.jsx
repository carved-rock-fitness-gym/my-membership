// Fixed linting issues - 2025-05-02
// Fixed linting issues - 2025-04-30
// This component is missing prop-types
import React, { Component } from 'react';

class FeatureClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'details',
            data: null,
            loading: false,
            error: null,
            unused_state: 'test'  // Unused state
        };
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    fetchData = async () => {
        this.setState({ loading: true });
        try {
            // Simulate API call
            const response = await new Promise(resolve => 
                setTimeout(() => resolve({ data: { name: 'Feature Data' } }), 1000)
            );
            this.setState({ data: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching data:', error);  // Console error
            this.setState({ error: error.message, loading: false });
        }
    }
    
    changeTab = (tab) => {
        this.setState({ activeTab: tab });
    }
    
    render() {
        const { loading, data, error, activeTab } = this.state;
        
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        
        return (
            <div className="feature-container">
                <div className="tabs">
                    <button 
                        className={activeTab === 'details' ? 'active' : ''}
                        onClick={() => this.changeTab('details')}
                    >
                        Details
                    </button>
                    <button 
                        className={activeTab === 'settings' ? 'active' : ''}
                        onClick={() => this.changeTab('settings')}
                    >
                        Settings
                    </button>
                </div>
                
                <div className="tab-content">
                    {activeTab === 'details' && (
                        <div>
                            <h2>Feature Details</h2>
                            {data && <div>{data.name}</div>}
                            <p>{this.props.description}</p>
                        </div>
                    )}
                    
                    {activeTab === 'settings' && (
                        <div>
                            <h2>Feature Settings</h2>
                            <p>Configure feature settings here</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

// Missing PropTypes

export default FeatureClass;
