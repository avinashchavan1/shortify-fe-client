import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AppRouterConstants } from './AppRouter.contants';

interface AppRouterProps {
  children: React.ReactNode;
}

const HomeComponent = lazy(() => import('./../../pages/home/Home'));
const AboutUsComponent = lazy(() => import('../../pages/aboutUs/AboutUs'));
const QrCodeGenerationComponent = lazy(
  () => import('../../pages/qr-code-generation/QrCodeGeneration')
);
const LinkManagementComponent = lazy(() => import('../../pages/link-management/LinkManagement'));
const SignUpComponent = lazy(() => import('../../pages/sign-up/SignUp'));
const SignInComponent = lazy(() => import('../../pages/sign-in/SignIn'));
const InactiveUrlWarningComponent = lazy(() => import('./inactive-page/InactiveUrlWarning'));
const PageNotFoundWithIconsComponent = lazy(
  () => import('../page-not-found/PageNotFoundWithIcons')
);
const PrivacyComponent = lazy(() => import('../../pages/privacy/Privacy'));
const SiteMapComponent = lazy(() => import('../../pages/site-map/SiteMap'));

const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to={AppRouterConstants.HOME} replace />} />
        <Route path={AppRouterConstants.HOME} element={<HomeComponent />} />

        <Route path={AppRouterConstants.ABOUT_US} element={<AboutUsComponent />} />
        <Route
          path={AppRouterConstants.QR_CODE_GENERATION}
          element={<QrCodeGenerationComponent />}
        />
        <Route path={AppRouterConstants.LINK_MANAGEMENT} element={<LinkManagementComponent />} />

        <Route path={AppRouterConstants.REGISTER} element={<SignUpComponent />} />
        <Route path={AppRouterConstants.LOGIN} element={<SignInComponent />} />

        <Route path={AppRouterConstants.INACTIVE_URL} element={<InactiveUrlWarningComponent />} />
        <Route path={AppRouterConstants.PRIVACY} element={<PrivacyComponent />} />
        <Route path={AppRouterConstants.SITE_MAP} element={<SiteMapComponent />} />

        {/* Redirect to 404 for any unmatched routes */}

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<PageNotFoundWithIconsComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
