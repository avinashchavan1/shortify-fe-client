import { ComponentType } from 'react';

export type TRefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

const withAuth =
  <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
    return <WrappedComponent {...props} />;
  };

export default withAuth;
