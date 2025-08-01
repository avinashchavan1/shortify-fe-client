import React, { useEffect } from 'react';
import { Layout } from 'antd';
import './layout.css';
import CustomHeader from '../components/header/CustomHeader';
import CustomFooter from '../components/footer/CustomFooter';
import { AppRouterConstants } from '../components/core/AppRouter.contants';
import { isAuthenticatedUser } from '../components/header/CustomHeader.helper';
// import { HTTP_ACCESS_TOKEN_COOKIE_NAME } from '../components/core/http-client/HttpClient.constants';
import { fetchUser } from '../pages/sign-in/UserState.Slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../components/app/store/store';
import HttpClient from '../components/core/http-client/HttpClient';
import { HttpUrlLinks } from '../components/core/http-client/HttpClient.constants';

const { Content } = Layout;

interface LayoutHocProps {
  children: React.ReactNode;
}

const protectedRoutes = [
  AppRouterConstants.HOME,
  AppRouterConstants.ABOUT_US,
  AppRouterConstants.QR_CODE_GENERATION,
  AppRouterConstants.LINK_MANAGEMENT,
];

const LayoutHoc: React.FC<LayoutHocProps> = ({ children }) => {
  const pathName = window.location.pathname;
  const dispatch = useDispatch<AppDispatch>();

  const isProtected = protectedRoutes.includes(pathName);
  const { isAuthenticated } = isAuthenticatedUser();

  useEffect(() => {
    const controller = new AbortController();

    async function refreshUser() {
      dispatch(fetchUser());
    }

    if (isProtected && !isAuthenticated) {
      refreshUser();
    }

    // cancel the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  // pooling for authentication status

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isAuthenticated) {
        await HttpClient.GET(HttpUrlLinks.hello);
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAuthenticated, dispatch]);

  return (
    <Layout>
      <CustomHeader isPublicPage={false} />
      <Content>{children}</Content>
      <CustomFooter />
    </Layout>
  );
};

export default LayoutHoc;
