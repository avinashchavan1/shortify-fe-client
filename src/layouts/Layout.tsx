import React from 'react';
import { Layout } from 'antd';
import "./layout.css"
import CustomHeader from '../components/header/CustomHeader';
import CustomFooter from '../components/footer/CustomFooter';

const { Content } = Layout;


interface LayoutHocProps {
    children: React.ReactNode;
}


const LayoutHoc: React.FC<LayoutHocProps> = ({ children }) => {


    return (
        <Layout>
            <CustomHeader isPublicPage={false} />
            <Content >{children}</Content>
            <CustomFooter />
        </Layout>
    );
};

export default LayoutHoc;