import React from 'react'
import './header.scss'
import header_logo from '../../assets/header_logo.svg'
import notifications from '../../assets/notifications_logo.svg'
import settings from '../../assets/settings_logo.svg'
import home from '../../assets/home_logo.svg'
import {Link} from 'react-router-dom'


const Header = () => {
    return (
        <div className='header-body'>
            <div className="left">
                <div className="header-logo">
                    <div className="logo">
                        <img src={header_logo} alt="" />
                    </div>
                    <Link to="/" style={{ textDecoration: 'none' }}><div className="text">LAMA</div></Link>
                </div>
                <div className="header-btn">
                    <button>
                        <span className="icon">
                            <img src={home} alt="" />
                        </span>
                        <span className="text">Back to home</span>
                    </button>
                </div>
            </div>

            <div className="header-icons">
                <img src={settings} alt="" />
                <img src={notifications} alt="" />
            </div>
        </div>
    )
}

export default Header