import { Layout, Input, Button, Dropdown, Space } from 'antd';
import {
  CodeFilled,
  DownOutlined,
  GithubOutlined,
  InstagramOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LinkedinOutlined } from '@ant-design/icons';
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
    <Footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img src="/appLogo.svg" alt="ShortURL Logo" />
            <span>Avibit</span>
          </div>
          <div className="newsletter">
            <p>Subscribe to our newsletter</p>
            <div className="subscribe-form">
              <Input placeholder="Enter your email" />
              <Button type="primary">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* <Row className="footer-links" gutter={[24, 0]}>
          <Col xs={24} sm={12} md={6}>
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">User guides</a>
              </li>
              <li>
                <a href="#">Webinars</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h4>Plans & Pricing</h4>
            <ul>
              <li>
                <a href="#">Personal</a>
              </li>
              <li>
                <a href="#">Start up</a>
              </li>
              <li>
                <a href="#">Organization</a>
              </li>
            </ul>
          </Col>
        </Row> */}

        <div className="footer-bottom">
          <div className="footer-left">
            <Dropdown menu={{ items: languageItems }}>
              <a onClick={e => e.preventDefault()}>
                <Space>
                  English
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <span className="copyright">© {year} Avibit, Inc. • </span>
            <a href="/ui/privacy">Privacy</a>
            <span> • </span>
            <a href="/ui/terms">Terms</a>
            <span> • </span>
            <a href="/ui/sitemap">Sitemap</a>
          </div>
          <div className="social-icons">
            <a href="https://avinashchavan.com" target="_blank" rel="noopener noreferrer">
              <UserOutlined />
            </a>
            <a
              href="https://www.instagram.com/avinashchavan_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://www.linkedin.com/in/avinash-chavan-1a924b142/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined />
            </a>
            <a href="https://github.com/avinashchavan1" target="_blank" rel="noopener noreferrer">
              <GithubOutlined />
            </a>

            <a
              href="https://leetcode.com/u/chavanavinash/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeFilled />
            </a>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default CustomFooter;
