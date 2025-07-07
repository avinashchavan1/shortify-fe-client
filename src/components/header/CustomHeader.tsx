import { Layout, Menu, Button, Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import './CustomHeader.css';
import { Link, useLocation } from 'react-router-dom';
import { AppRouterConstants } from '../core/AppRouter.contants';
import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';

const { Header } = Layout;

export interface CustomHeaderProps {
  // isAuthenticated: boolean;
  isPublicPage: boolean;
}

const CustomHeader = (props: CustomHeaderProps) => {
  const location = useLocation();

  const userState = useSelector((state: RootState) => state.userState);

  const { isPublicPage } = props;
  const user = userState?.user;
  const isAuthenticated = !!user?.id?.length; // Replace with your authentication logic

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
          ...(isAuthenticated && !isPublicPage
            ? [
                {
                  key: AppRouterConstants.LINK_MANAGEMENT,
                  label: <Link to={AppRouterConstants.LINK_MANAGEMENT}>Link Management</Link>,
                },
              ]
            : []),
          {
            key: AppRouterConstants.QR_CODE_GENERATION,
            label: <Link to={AppRouterConstants.QR_CODE_GENERATION}>QR Code Generation</Link>,
          },
          {
            key: AppRouterConstants.ABOUT_US,
            label: <Link to={AppRouterConstants.ABOUT_US}>About Us</Link>,
          },
        ]}
      ></Menu>
      {!isPublicPage && (
        <>
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
                {user.name}{' '}
              </Title>
              <Avatar icon={<UserOutlined />} />
              <Button type="primary">Log out</Button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Button type="text">
                <Link to={AppRouterConstants.LOGIN}>Sign In</Link>
              </Button>
              <Button type="primary">
                <Link to={AppRouterConstants.REGISTER}>Sign Up</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </Header>
  );
};

export default CustomHeader;
