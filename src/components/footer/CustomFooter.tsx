import React from 'react';
import { Layout, Row, Col, Input, Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TwitterOutlined, FacebookOutlined, LinkedinOutlined, YoutubeOutlined } from '@ant-design/icons';
import './CustomFooter.css';

const { Footer } = Layout;

const CustomFooter = () => {
  const year = new Date().getFullYear();

  const languageItems = [
    {
      key: '1',
      label: 'English',
    },
    {
      key: '2',
      label: 'Spanish',
    },
    {
      key: '3',
      label: 'French',
    },
  ];

  return (
    <Footer className="custom-footer" >
      <div className="footer-container">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img src="/appLogo.svg" alt="ShortURL Logo" />
            <span>Shortify</span>
          </div>
          <div className="newsletter">
            <p>Subscribe to our newsletter</p>
            <div className="subscribe-form">
              <Input placeholder="Enter your email" />
              <Button type="primary">Subscribe</Button>
            </div>
          </div>
        </div>

        <Row className="footer-links" gutter={[24, 0]}>
          <Col xs={24} sm={12} md={6}>
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">User guides</a></li>
              <li><a href="#">Webinars</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h4>Plans & Pricing</h4>
            <ul>
              <li><a href="#">Personal</a></li>
              <li><a href="#">Start up</a></li>
              <li><a href="#">Organization</a></li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <div className="footer-left">
            <Dropdown menu={{ items: languageItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  English
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <span className="copyright">© {year} Shortify, Inc. • </span>
            <a href="#">Privacy</a>
            <span> • </span>
            <a href="#">Terms</a>
            <span> • </span>
            <a href="#">Sitemap</a>
          </div>
          <div className="social-icons">
            <a href="#"><TwitterOutlined /></a>
            <a href="#"><FacebookOutlined /></a>
            <a href="#"><LinkedinOutlined /></a>
            <a href="#"><YoutubeOutlined /></a>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default CustomFooter;
