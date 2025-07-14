import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';

export const isAuthenticatedUser = () => {
  const userState = useSelector((state: RootState) => state.userState);

  const user = userState?.user;
  const isAuthenticated = !!user?.id?.length; // Replace with your authentication logic
  return { isAuthenticated, user };
};
