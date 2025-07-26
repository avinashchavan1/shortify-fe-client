import React from 'react';
import { Result } from 'antd';

const InactiveUrlWarning: React.FC = () => (
  <Result
    status="403"
    title="URL Redirect Inactive"
    subTitle="It appears that the owner has disabled URL redirection. Please contact the owner to reactivate this feature."
    // extra={
    //   <Button type="primary">
    //     <Link to={AppRouterConstants.HOME}>Back to Home</Link>
    //   </Button>
    // }
  />
);

export default InactiveUrlWarning;
