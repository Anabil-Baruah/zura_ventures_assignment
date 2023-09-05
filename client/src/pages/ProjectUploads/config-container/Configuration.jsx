import React, { useState } from 'react'
import './config.scss'
import { Display, General, Advanced } from '../../../components'

const Configuration = () => {
    const [activeTab, setActiveTab] = useState('General');

    const renderComponent = () => {
        switch (activeTab) {
            case 'Display':
                return <Display />;
            case 'Advanced':
                return <Advanced />;
            default:
                return <General />;
        }
    };
    return (
        <div className='config-container'>
            <div className="header">
                <div
                    className={`theme ${activeTab === 'General' ? 'active' : ''}`}
                    onClick={() => setActiveTab('General')}
                >
                    General
                </div>
                <div
                    className={`theme ${activeTab === 'Display' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Display')}
                >
                    Display
                </div>
                <div
                    className={`theme ${activeTab === 'Advanced' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Advanced')}
                >
                    Advanced
                </div>
            </div>
            <div className="form-container">
                {renderComponent()}
            </div>
        </div>
    )
}

export default Configuration