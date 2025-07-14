export const HttpUrlLinks = {
  saveUrl: '/url/saveUrl',
  me: '/user/me',
  login: '/api/auth/login',
  logout: 'api/auth/logout',
  register: '/user/saveUser',
  getAllUrls: '/url/getAllUrls',
  getAll: '/url/all',
  refreshToken: '/api/auth/refreshToken',
  urlDetails: (id: string) => `url/${id}`,
  suspendUrl: (id: string) => `url/${id}/suspend`,
  activateUrl: (id: string) => `url/${id}/activate`,
  getUrlById: (id: string) => `/url/getUrlById/${id}`,
  getAllByPageAndFilter: (
    page: number,
    pageSize: number,
    sortField: string,
    sortDir: string,
    filterString = ''
  ) =>
    `/url/all/${page}?pageSize=${pageSize}&sortField=${sortField}&sortDir=${sortDir}${filterString}`,
};

export const HTTP_ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
export const HTTP_REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
