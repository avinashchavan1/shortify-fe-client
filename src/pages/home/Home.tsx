import { Typography, Input, Button, Row, Col, Checkbox, CheckboxChangeEvent, } from 'antd';
import { HomeOutlined, SafetyCertificateOutlined, QuestionCircleOutlined, CopyOutlined } from '@ant-design/icons';
import './Home.css'
import LayoutHoc from '../../layouts/Layout';
import { useState } from 'react';
// import 'antd/dist/antd.css';


export type NotificationType = 'success' | 'info' | 'warning' | 'error';


const { Title, Paragraph } = Typography;


export const Home = () => {
  const [isCustom, setIsCustom] = useState(false);
  const [url, setUrl] = useState("")
  const [customCode, setCustomCode] = useState('');
  const [shortLink, setShortLink] = useState("")
  const onCheckboxChange = (value: CheckboxChangeEvent) => {
    setIsCustom((prevState) => !prevState);
    console.log("onCheckbox", value)
  }

  const [error, setError] = useState("")





  const handleSubmit = () => {
    console.log("submit", url, isCustom, customCode)
    setShortLink("hey im ready")
    setError('');
  }
  return (
    <LayoutHoc>
      <div className="url-shortener-container">
        <div className="shortener-section">
          <Title level={2} className="section-title">
            URL Shortener Service
          </Title>
          <Paragraph className="instruction-text">
            Paste the long URL you want to shorten in the box below
          </Paragraph>

          <Input
            id="url-input"
            placeholder="https://www.example-long-url.com/..."
            className="url-input"
            onChange={(e) => setUrl(e.target.value)}
          />

          <Checkbox
            onChange={onCheckboxChange}
            className="custom-url-checkbox"
            id="custom-url-checkbox"
          >
            Use custom short URL
          </Checkbox>

          {isCustom && (
            <Input
              id="custom-url-input"
              placeholder="Enter custom short URL"
              className="code-input"
              onChange={(e) => setCustomCode(e.target.value)}
              max={6}
              min={6}
            />
          )}
          <Button
            id="shorten-button"
            type="primary"
            className="shorten-button"
            onClick={() => handleSubmit()}
          >
            Shorten URL
          </Button>
          {shortLink.length > 0 && (
            <Typography.Text
              type="secondary"
              copyable={{
                text: shortLink,
                icon: <CopyOutlined className="copy-icon" />, // or a custom icon
                tooltips: 'Click to copy',
              }}
              className="copyable-text"
            >
              bit.ly/ahdib
            </Typography.Text>
          )}
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
        </div>

        <div className="benefits-section">
          <Title level={2} className="section-title">
            Benefits of URL Shortening
          </Title>

          <Row gutter={[32, 32]} className="benefits-row">
            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <HomeOutlined className="benefit-icon" />
                <Title level={4}>Pure Click</Title>
                <Paragraph>
                  Your destination page will not be a displayed directly in the
                  address bar. This will help with click tracking, analytics, or
                  simply to mask the original URL.
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <SafetyCertificateOutlined className="benefit-icon" />
                <Title level={4}>Enhanced Security</Title>
                <Paragraph>
                  URL shortening can also provide an additional layer of
                  security by masking the original URL, which may help prevent
                  exposure of sensitive data.
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <QuestionCircleOutlined className="benefit-icon" />
                <Title level={4}>Valuable Insights</Title>
                <Paragraph>
                  URL shorteners often provide analytics, allowing you to track
                  clicks, geographic location, and referrer information.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </LayoutHoc>
  );
};