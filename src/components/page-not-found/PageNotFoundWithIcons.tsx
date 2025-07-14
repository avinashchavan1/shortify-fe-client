import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { AppRouterConstants } from '../core/AppRouter.contants';

const PageNotFoundWithIcons: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <Link to={AppRouterConstants.HOME}>Back to Home</Link>
      </Button>
    }
  />
);

export default PageNotFoundWithIcons;
