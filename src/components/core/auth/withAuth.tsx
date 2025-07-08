import { ComponentType, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store/store';
import { fetchUser } from '../../../pages/sign-in/UserState.Slice';

export type TRefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

const withAuth =
  <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      async function refreshToken() {
        dispatch(fetchUser());
      }

      refreshToken();
    }, [dispatch]);

    return <WrappedComponent {...props} />;
  };

export default withAuth;
