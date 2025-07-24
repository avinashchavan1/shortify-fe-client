import { Button } from 'antd';

import googleLogo from '../../../public/google.svg';

export interface IContinueWithGoogleProps {
  isLoading: boolean;
}

export const ContinueWithGoogle = (props: IContinueWithGoogleProps) => {
  const { isLoading } = props;

  return (
    <a href={import.meta.env.VITE_OAUTH2_GOOGLE_URL}>
      <Button
        type="primary"
        htmlType="button"
        block
        style={{
          backgroundColor: 'white',
          color: '#000',
          borderColor: '#d9d9d9',
        }}
        disabled={isLoading}
      >
        {
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1890ff' }}>
            <img
              src={googleLogo}
              alt="Google Logo"
              style={{
                height: 16,
              }}
            />
            <p>Continue with Google</p>
          </div>
        }
      </Button>
    </a>
  );
};
