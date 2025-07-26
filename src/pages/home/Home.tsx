import { Typography, Input, Button, Row, Col, Checkbox, CheckboxChangeEvent } from 'antd';
import {
  HomeOutlined,
  SafetyCertificateOutlined,
  QuestionCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import './Home.css';
import LayoutHoc from '../../layouts/Layout';
import { useEffect, useState } from 'react';
import HttpClient from '../../components/core/http-client/HttpClient';
import { HttpUrlLinks } from '../../components/core/http-client/HttpClient.constants';
import { getValue } from '../../utils/helpers';
import { regexUrl } from './Home.helpers';
import RecentLinks, { LinkItem } from '../last-few-generations/RecentLinks';
import { TLinkResponse, TTableResponseData } from '../link-management/LinkManagement.types';
import { isAuthenticatedUser } from '../../components/header/CustomHeader.helper';
// import 'antd/dist/antd.css';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type TResponseSaveUrl = {
  shortUrl: string;
  originalUrl: string;
  customCode?: string;
  createdAt: string;
  message: string;
};

export type DefaultCreateUrlPayload = {
  originalUrl: string;
  uniqueKey?: string;
};

export const HomeMessages = {
  Empty: 'URL cannot be empty',
  InvalidUrl: 'Please enter a valid URL',
  UrlExceedsMaxLength: 'URL exceeds maximum length of 2048 characters',
  UrlShortened: 'URL has been shortened successfully',
};

const { Title, Paragraph } = Typography;

export const Home = () => {
  const [isCustom, setIsCustom] = useState(false);
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [loading, setLoading] = useState(false);
  const onCheckboxChange = (_value: CheckboxChangeEvent) => {
    setIsCustom(prevState => !prevState);
  };
  const [recentLinks, setRecentLinks] = useState<LinkItem[]>([]);
  const [error, setError] = useState('');
  const defaultUrl = HttpUrlLinks.getAllByPageAndFilter(1, 5, 'createdAt', 'desc');
  const { isAuthenticated } = isAuthenticatedUser();
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const fetchRecentLinks = async () => {
      try {
        const response = (await HttpClient.GET<TTableResponseData>(
          defaultUrl
        )) as unknown as TTableResponseData;
        console.log('Recent links fetched:', response);
        const allUrls = response.content ?? [];

        const formattedData: LinkItem[] = allUrls.map((item: TLinkResponse) => ({
          id: item.id,
          shortUrl: item.shortUrl,
          originalUrl: item.originalUrl,
          timestamp: item.createdAt,
        }));

        setRecentLinks(formattedData);
        console.log('Formatted recent links:', formattedData);
      } catch (error) {
        console.error('Error fetching recent links:', error);
      }
    };
    fetchRecentLinks();
  }, [isAuthenticated, shortLink]);

  const handleOnChangeUrl = (data: string) => {
    setUrl(data);

    if (data.length === 0) {
      setError(HomeMessages.Empty);
    } else if (!regexUrl.test(data)) {
      setError(HomeMessages.InvalidUrl);
    } else if (data.length > 2048) {
      setError(HomeMessages.UrlExceedsMaxLength);
    } else {
      setError('');
    }
    setShortLink('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (error.length === 0 && url.length > 0) {
      const requestBody: DefaultCreateUrlPayload = {
        originalUrl: url,
      };

      if (isCustom && customCode.length === 6) {
        requestBody['uniqueKey'] = customCode.toLowerCase();
      }

      const urlData = {
        url: HttpUrlLinks.saveUrl,
        data: requestBody,
        successMessage: HomeMessages.UrlShortened,
      };
      try {
        const resp = await HttpClient.POST<TResponseSaveUrl>(urlData);
        setShortLink(resp.shortUrl);
        setLoading(false);
      } catch (e) {
        const errorMessage = getValue(e, 'response.data.message') || 'Something went wrong';
        console.log('home', errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    }
  };

  const handleOnChangeCustomCode = (data: string) => {
    setError('');
    setCustomCode(data.toLowerCase());
    setShortLink('');
  };
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
            onChange={e => handleOnChangeUrl(e.target.value)}
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
              onChange={e => handleOnChangeCustomCode(e.target.value)}
              max={6}
              min={6}
            />
          )}
          <Button
            id="shorten-button"
            type="primary"
            className="shorten-button"
            onClick={() => handleSubmit()}
            disabled={
              error.length > 0 ||
              url.length === 0 ||
              (isCustom && customCode.length !== 6) ||
              shortLink.length > 0 ||
              loading
            }
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
              {shortLink}
            </Typography.Text>
          )}
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
        </div>
        <div className="shortner-section">
          <RecentLinks links={recentLinks} />
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
                  Your destination page will not be a displayed directly in the address bar. This
                  will help with click tracking, analytics, or simply to mask the original URL.
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <SafetyCertificateOutlined className="benefit-icon" />
                <Title level={4}>Enhanced Security</Title>
                <Paragraph>
                  URL shortening can also provide an additional layer of security by masking the
                  original URL, which may help prevent exposure of sensitive data.
                </Paragraph>
              </div>
            </Col>

            <Col xs={24} md={8} className="benefit-col">
              <div className="benefit-card">
                <QuestionCircleOutlined className="benefit-icon" />
                <Title level={4}>Valuable Insights</Title>
                <Paragraph>
                  URL shorteners often provide analytics, allowing you to track clicks, geographic
                  location, and referrer information.
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
