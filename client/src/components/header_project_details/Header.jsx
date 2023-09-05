import React from 'react'
import home_logo from '../../assets/home_logo2.svg'
import arrow_dropdown from '../../assets/arrow_drop_down.svg'
import flag from '../../assets/Flag.svg'
import bell from '../../assets/notifications_logo.svg'
import './header.scss'

const Header = ({navigator}) => {
  return (
    <div className="header-content">
      <div className='location'>
        <div className="icon">
          <img src={home_logo} alt="" />
        </div>
        <div className="curr-location"> / Sample Project /&nbsp;
          <span>{navigator}</span>
        </div>
      </div>

      <div className="right">
        <div className="dropdown">
          <img src={arrow_dropdown} alt="" />
        </div>
        <div className="language">
          <div>EN</div>
        </div>
          <div className="flag">
            <img src={flag} alt="" />
          </div>
          <div className="bell">
            <img src={bell} alt="" />
          </div>
      </div>
    </div>
  )
}

export default Header