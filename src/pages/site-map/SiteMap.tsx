import React from 'react';

export const SiteMapConstants = {
  HOME: '/ui/home',
  LOGIN: '/ui/login',
  REGISTER: '/ui/register',
  DASHBOARD: '/ui/dashboard',
  NOT_FOUND: '/ui/not-found',
  ABOUT_US: '/ui/about-us',
  LINK_MANAGEMENT: '/ui/link-management',
  QR_CODE_GENERATION: '/ui/qr-code-generation',
  INACTIVE_URL: '/ui/url-not-active',
  PRIVACY: '/ui/privacy',
  TERMS: '/ui/terms',
  HELP: '/ui/help',
  SITE_MAP: '/ui/sitemap',
};

const routeNamesMap = {
  [SiteMapConstants.HOME]: 'Home',
  [SiteMapConstants.LOGIN]: 'Login',
  [SiteMapConstants.REGISTER]: 'Register',
  [SiteMapConstants.DASHBOARD]: 'Dashboard',
  [SiteMapConstants.NOT_FOUND]: 'Not Found',
  [SiteMapConstants.ABOUT_US]: 'About Us',
  [SiteMapConstants.LINK_MANAGEMENT]: 'Link Management',
  [SiteMapConstants.QR_CODE_GENERATION]: 'QR Code Generation',
  [SiteMapConstants.INACTIVE_URL]: 'Inactive URL',
  [SiteMapConstants.PRIVACY]: 'Privacy Policy',
  [SiteMapConstants.TERMS]: 'Terms of Service',
  [SiteMapConstants.HELP]: 'Help',
  [SiteMapConstants.SITE_MAP]: 'Site Map',
};

const containerStyle = {
  padding: '20px',
  maxWidth: '700px',
  margin: 'auto',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
};

const headingStyle: React.CSSProperties = {
  color: '#004080',
  marginBottom: '20px',
  textAlign: 'center',
};

const listStyle = {
  listStyleType: 'none',
  paddingLeft: 0,
};

const listItemStyle = {
  marginBottom: '12px',
};

const linkStyle = {
  color: '#0066cc',
  textDecoration: 'none',
};

export const Sitemap = () => {
  // Convert constants to array for iteration, exclude NOT_FOUND or SITE_MAP if desired
  const filteredRoutes = Object.values(SiteMapConstants).filter(
    path => path !== SiteMapConstants.NOT_FOUND // Usually you might want to exclude 404 page from sitemap
  );

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Website Sitemap</h1>
      <ul style={listStyle}>
        {filteredRoutes.map(path => (
          <li key={path} style={listItemStyle}>
            <a
              href={path}
              style={linkStyle}
              onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              {routeNamesMap[path] || path}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;
