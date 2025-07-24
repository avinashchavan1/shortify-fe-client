export const HttpUrlLinks = {
  saveUrl: '/url/saveUrl',
  me: '/user/me',
  hello: '/user/hello',
  login: '/api/auth/login',
  logout: 'api/auth/logout',
  register: '/user/saveUser',
  getAllUrls: '/url/getAllUrls',
  getAll: '/url/all',
  refreshToken: '/api/auth/refreshToken',
  loginWithGoogle: '/oauth2/authorization/google',
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
  ) => {
    let params = false;
    let baseUrl = `url/all/${page}?`;
    if (pageSize) {
      baseUrl += `pageSize=${pageSize}`;
      params = true;
    }
    if (sortField && sortDir) {
      baseUrl += `&sortField=${sortField}&sortDir=${sortDir}`;
      params = true;
    }
    if (filterString) {
      baseUrl += filterString;
      params = true;
    }
    if (!params) {
      baseUrl = baseUrl.slice(0, -1); // Remove trailing '?'
    }

    return baseUrl;
  },
};

export const HTTP_ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
export const HTTP_REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
