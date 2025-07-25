import { Layout, Menu, Button, Avatar, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './CustomHeader.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRouterConstants } from '../core/AppRouter.contants';
import Title from 'antd/es/typography/Title';
import { AppDispatch } from '../app/store/store';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../pages/sign-in/UserState.Slice';
import {
  HTTP_ACCESS_TOKEN_COOKIE_NAME,
  HttpUrlLinks,
} from '../core/http-client/HttpClient.constants';
import { isAuthenticatedUser } from './CustomHeader.helper';
import HttpClient from '../core/http-client/HttpClient';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const { Header } = Layout;

export interface CustomHeaderProps {
  // isAuthenticated: boolean;
  isPublicPage: boolean;
}

const CustomHeader = (props: CustomHeaderProps) => {
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isPublicPage } = props;
  const { isAuthenticated, user } = isAuthenticatedUser(); // Replace with your authentication logic
  // const accessToken = localStorage.getItem(HTTP_ACCESS_TOKEN_COOKIE_NAME) || '';
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const isNotSignInOrSignUpPage =
    pathName !== AppRouterConstants.LOGIN && pathName !== AppRouterConstants.REGISTER;
  const userName: string = user.name
    .split(' ')
    .filter(Boolean)
    .map(val => val[0])
    .join('')
    .toUpperCase();

  const handleLogout = async () => {
    await HttpClient.GET(HttpUrlLinks.logout);
    localStorage.removeItem(HTTP_ACCESS_TOKEN_COOKIE_NAME);
    toast.success('Logged out successfully');
    navigate(AppRouterConstants.LOGIN);
  };

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems =
    isNotSignInOrSignUpPage && isAuthenticated
      ? [
          {
            key: AppRouterConstants.HOME,
            label: <Link to={AppRouterConstants.HOME}>Home</Link>,
          },
          {
            key: AppRouterConstants.LINK_MANAGEMENT,
            label: <Link to={AppRouterConstants.LINK_MANAGEMENT}>Link Management</Link>,
          },
          {
            key: AppRouterConstants.QR_CODE_GENERATION,
            label: <Link to={AppRouterConstants.QR_CODE_GENERATION}>QR Code Generation</Link>,
          },
          {
            key: AppRouterConstants.ABOUT_US,
            label: <Link to={AppRouterConstants.ABOUT_US}>About Us</Link>,
          },
        ]
      : [];

  const generateUserIcon = (isMobile: boolean, userLink: string) => {
    if (isMobile) {
      if (userLink?.length) {
        return (
          <img
            src={userLink}
            alt="profile"
            style={{
              borderRadius: '50%',
              height: '36px',
              width: '36px',
              border: '1px solid #1677ff',
            }}
          />
        );
      }

      return <Avatar>{userName}</Avatar>;
    } else {
      if (userLink?.length) {
        return (
          <img
            src={userLink}
            alt="profile"
            style={{
              borderRadius: '50%',
              height: '48px',
              width: '48px',
              border: '2px solid #1677ff',
            }}
          />
        );
      }

      return <Avatar>{userName}</Avatar>;
    }
  };

  const userData = (
    <>
      {isMobile ? (
        <>
          {/* {!!userName.length ? <Avatar>{userName}</Avatar> : <Avatar icon={<UserOutlined />} />} */}
          {generateUserIcon(isMobile, user.photo)}

          <Title
            level={5}
            style={{
              height: '30px',
              transform: 'translate(-3.26562px, -7.42969px)',
            }}
          >
            {user.name}{' '}
          </Title>
        </>
      ) : (
        <>
          <Title
            level={5}
            style={{
              height: '30px',
              transform: 'translate(-3.26562px, -7.42969px)',
            }}
          >
            {user.name}{' '}
          </Title>
          {/* {!!userName.length ? <Avatar>{userName}</Avatar> : <Avatar icon={<UserOutlined />} />} */}
          {generateUserIcon(isMobile, user.photo)}
        </>
      )}
    </>
  );

  const userSection = isAuthenticated ? (
    <div className="header-actions">
      {/* <Button icon={<BellOutlined />} /> */}
      {userData}
      <Button
        type="primary"
        onClick={() => {
          handleLogout();
          dispatch(clearUser());
        }}
      >
        Log out
      </Button>
    </div>
  ) : (
    <></>
  );

  return (
    <Header className="custom-header">
      <div className="logo">
        <Link to={isAuthenticated ? AppRouterConstants.HOME : AppRouterConstants.LOGIN}>
          Avibit
        </Link>
      </div>

      {isMobile && isAuthenticated ? (
        <div className="menu-wrapper">
          <Menu
            mode="horizontal"
            activeKey={location.pathname}
            items={menuItems}
            className="desktop-menu"
          />
          <div className="header-actions">
            {generateUserIcon(isMobile, user.photo)}
            <Title
              level={5}
              style={{
                height: '30px',
                transform: 'translate(-3.26562px, -7.42969px)',
              }}
            >
              {user.name.split(' ')[0]}{' '}
            </Title>{' '}
          </div>
          <Button
            className="mobile-menu-button"
            icon={<MenuOutlined style={{ color: '#1677ff' }} />}
            onClick={() => setDrawerVisible(true)}
            type="text"
          />
          <Drawer
            title={<div className="header-actions">{userData}</div>}
            placement="right"
            closable={true}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            className="mobile-drawer"
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={() => setDrawerVisible(false)}
            />
            <Button
              style={{ marginLeft: '24px', marginTop: '8px' }}
              type="primary"
              onClick={() => {
                handleLogout();
                dispatch(clearUser());
              }}
            >
              Log out
            </Button>
          </Drawer>
        </div>
      ) : (
        <>
          <Menu mode="horizontal" activeKey={location.pathname} items={menuItems}></Menu>
          {userSection}
        </>
      )}
      {/* {isAuthenticated && (
        <div className="header-actions">
          <Button icon={<BellOutlined />} />
          <Title
            level={5}
            style={{
              height: '30px',
              transform: 'translate(-3.26562px, -7.42969px)',
            }}
          >
            {user.name}{' '}
          </Title>
          {!!userName.length ? <Avatar>{userName}</Avatar> : <Avatar icon={<UserOutlined />} />}
          <Button
            type="primary"
            onClick={() => {
              hanldeLogout();
              dispatch(clearUser());
            }}
          >
            Log out
          </Button>
        </div>
      )} */}
      {isPublicPage && (
        <div className="auth-buttons">
          <Button type="text" onClick={() => navigate(AppRouterConstants.LOGIN)}>
            Login
          </Button>
          <Button type="primary" onClick={() => navigate(AppRouterConstants.REGISTER)}>
            Register
          </Button>
        </div>
      )}
    </Header>
  );
};

export default CustomHeader;
