import React from 'react';
import { Layout } from 'antd';
import "./layout.css"
import CustomHeader from '../components/header/CustomHeader';
import CustomFooter from '../components/footer/CustomFooter';

const { Content } = Layout;



interface LayoutHocProps {
    children: React.ReactNode;
}


const PublicPageLayout: React.FC<LayoutHocProps> = ({ children }) => {
    return (
        <Layout>
            <CustomHeader isPublicPage={true} />
            <Content>{children}</Content>
            <CustomFooter />
        </Layout>
    );
};

export default PublicPageLayout;