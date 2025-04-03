import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import "./layout.css"
import CustomHeader from '../components/header/CustomHeader';
import CustomFooter from '../components/footer/CustomFooter';

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 2 }).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));

interface LayoutHocProps {
    children: React.ReactNode;
}


const LayoutHoc: React.FC<LayoutHocProps> = ({ children }) => {


    return (
        <Layout>
            <CustomHeader />
            <Content >{children}</Content>
            <CustomFooter />
        </Layout>
    );
};

export default LayoutHoc;