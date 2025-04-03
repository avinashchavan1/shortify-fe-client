import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar } from 'antd';
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import './CustomHeader.css';
import { Link, useLocation } from 'react-router-dom';
import { AppRouterConstants } from '../core/AppRouter.contants';
import Title from 'antd/es/typography/Title';


const { Header } = Layout;

const CustomHeader = () => {
  const location = useLocation();

  const isAuthenticated = false; // Replace with your authentication logic
  return (
    <Header className="custom-header">
      <div className="logo">
        <Link to={AppRouterConstants.HOME}>Shortify</Link>
      </div>
      <Menu
        mode="horizontal"
        activeKey={location.pathname}
        items={[
          {
            key: AppRouterConstants.HOME,
            label: <Link to={AppRouterConstants.HOME}>Home</Link>,
          },
          ...(isAuthenticated
            ? [
              {
                key: AppRouterConstants.LINK_MANAGEMENT,
                label: (
                  <Link to={AppRouterConstants.LINK_MANAGEMENT}>
                    Link Management
                  </Link>
                ),
              },
            ]
            : []),
          {
            key: AppRouterConstants.QR_CODE_GENERATION,
            label: (
              <Link to={AppRouterConstants.QR_CODE_GENERATION}>
                QR Code Generation
              </Link>
            ),
          },
          {
            key: AppRouterConstants.ABOUT_US,
            label: <Link to={AppRouterConstants.ABOUT_US}>About Us</Link>,
          },
        ]}
      ></Menu>
      {isAuthenticated ? (
        <div className="header-actions">
          <Button icon={<BellOutlined />} />
          <Title
            level={5}
            style={{
              height: '30px',
              transform: 'translate(-3.26562px, -7.42969px)',
            }}
          >
            Avinash Chavan{' '}
          </Title>
          <Avatar icon={<UserOutlined />} />
          <Button type="primary">Log out</Button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Button type="text">

            <Link to={AppRouterConstants.REGISTER}>
              Sign In
            </Link>

          </Button>
          <Button type="primary">
            <Link to={AppRouterConstants.LOGIN}>
              Sign Up
            </Link>
          </Button>
        </div>
      )}
    </Header>
  );
};

export default CustomHeader;
