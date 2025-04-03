import React from 'react';
import { Typography, Input, Button, Row, Col } from 'antd';
import { HomeOutlined, SafetyCertificateOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './Home.css'
import LayoutHoc from '../../layouts/Layout';
// import 'antd/dist/antd.css';


const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <LayoutHoc >
      <div className="url-shortener-container" >
        <div className="shortener-section">
          <Title level={2} className="section-title">URL Shortener Service</Title>
          <Paragraph className="instruction-text">
            Paste the long URL you want to shorten in the box below
          </Paragraph>

          <Input
            placeholder="https://www.example-long-url.com/..."
            className="url-input"
          />

          <Button type="primary" className="shorten-button">
            Shorten URL
          </Button>
        </div>

        <div className="benefits-section">
          <Title level={2} className="section-title">Benefits of URL Shortening</Title>

          <Row gutter={[32, 32]} className="benefits-row">
            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <HomeOutlined className="benefit-icon" />
                <Title level={4}>Pure Click</Title>
                <Paragraph>
                  Your destination page will not be a displayed directly in the address bar. This will help with click tracking, analytics, or simply to mask the original URL.
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <SafetyCertificateOutlined className="benefit-icon" />
                <Title level={4}>Enhanced Security</Title>
                <Paragraph>
                  URL shortening can also provide an additional layer of security by masking the original URL, which may help prevent exposure of sensitive data.
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <QuestionCircleOutlined className="benefit-icon" />
                <Title level={4}>Valuable Insights</Title>
                <Paragraph>
                  URL shorteners often provide analytics, allowing you to track clicks, geographic location, and referrer information.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </LayoutHoc>
  );
};

export default Home;
