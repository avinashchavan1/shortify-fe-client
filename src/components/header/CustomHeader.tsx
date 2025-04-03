import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar } from 'antd';
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import './CustomHeader.css';
import { Link, useLocation } from 'react-router-dom';
import { AppRouterConstants } from '../core/AppRouter.contants';


const { Header } = Layout;

const CustomHeader = () => {

  const location = useLocation();

  return (
    <Header
      className="custom-header"

    >
      <div className="logo">
        <Link to={AppRouterConstants.HOME}>Shortify</Link>
      </div>
      <Menu mode="horizontal" activeKey={location.pathname}>
        <Menu.Item key={AppRouterConstants.HOME}>
          <Link to={AppRouterConstants.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item key={AppRouterConstants.LINK_MANAGEMENT}>
          <Link to={AppRouterConstants.LINK_MANAGEMENT}>Link Management</Link>
        </Menu.Item>
        <Menu.Item key={AppRouterConstants.QR_CODE_GENERATION}>
          <Link to={AppRouterConstants.QR_CODE_GENERATION}>
            QR Code Generation
          </Link>
        </Menu.Item>
        <Menu.Item key={AppRouterConstants.ABOUT_US}>
          <Link to={AppRouterConstants.ABOUT_US}>About Us</Link>
        </Menu.Item>
      </Menu>
      <div className="header-actions">
        <Button icon={<SearchOutlined />} />
        <Button icon={<BellOutlined />} />
        <Avatar icon={<UserOutlined />} />
      </div>
    </Header >
  );
};

export default CustomHeader;
