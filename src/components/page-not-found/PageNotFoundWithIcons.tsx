import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import LayoutHoc from '../../layouts/Layout';
import { AppRouterConstants } from '../core/AppRouter.contants';

const PageNotFoundWithIcons: React.FC = () => (
    <LayoutHoc>

        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to={AppRouterConstants.HOME}>Back to Home</Link></Button>}
        />
    </LayoutHoc>
);

export default PageNotFoundWithIcons;