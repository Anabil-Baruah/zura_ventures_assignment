import React from 'react'
import './sideNavBar.scss'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link, useParams } from 'react-router-dom'
import header_logo from '../../assets/header_logo.svg'
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill,PiNumberCircleFourFill } from 'react-icons/pi';

const SideNavBar = () => {
  const { id } = useParams()
  const menuItems = [
    {
      key: '1',
      icon: <PiNumberCircleOneFill style={{ fontSize: 'large' }} />,
      label: 'Projects',
      link: `/details/${id}`
    },
    {
      key: '2',
      icon: <PiNumberCircleTwoFill style={{ fontSize: 'large' }} />,
      label: 'Edit Transcription',
      link: `/details/${id}/configuration`
    },
    {
      key: '3',
      icon: <PiNumberCircleThreeFill style={{ fontSize: 'large' }} />,
      label: 'Choose platform',
      link: '#'
    },
    {
      key: '5',
      icon: <PiNumberCircleFourFill style={{ fontSize: 'large' }} />,
      label: 'Pricing',
      link: '#'
    },
  ];

  return (
    <div className='nav-container'>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo-container">
          <Avatar src={header_logo} size="large" />
          <Typography.Title className='logo' level={2}>
            LAMA
          </Typography.Title>
        </div>
      </Link>

      <div className="nav-items">
        <Menu
          // onClick={onClick}
          style={{
            width: '100%',
          }}
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  )
}

export default SideNavBar