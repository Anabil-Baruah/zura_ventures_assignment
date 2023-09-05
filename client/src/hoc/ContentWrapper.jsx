import React from 'react';
import { SideNavBar } from '../components';

function ContentWraper({ children }) {
    return (
        <div className='main-body'>
            <SideNavBar />
            <div className="main-content">{children}</div>
        </div>
    );
}

export default ContentWraper;
