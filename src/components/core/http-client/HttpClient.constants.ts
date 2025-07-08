export const HttpUrlLinks = {
  saveUrl: '/url/saveUrl',
  me: '/user/me',
  login: '/api/auth/login',
  register: '/auth/register',
  getAllUrls: '/url/getAllUrls',
  getAll: '/url/all',
  refreshToken: '/api/auth/refreshToken',
  getUrlById: (id: string) => `/url/getUrlById/${id}`,
};

export const HTTP_ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
export const HTTP_REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
