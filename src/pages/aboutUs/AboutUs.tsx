import { Layout, Row, Col, Typography, Card } from 'antd';
import { RocketOutlined, HeartOutlined, GlobalOutlined } from '@ant-design/icons';
import './AboutUs.css';
import LayoutHoc from '../../layouts/Layout';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <LayoutHoc>
      <Content className="about-content">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-content">
            <Title level={1}>Our Story</Title>
            <Paragraph className="hero-subtitle">
              We're on a mission to simplify link sharing and enhance digital connections
            </Paragraph>
          </div>
        </div>

        {/* Mission Section */}
        <div className="section mission-section">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <div className="mission-image">
                <img src="/about-us.JPG" alt="Our Mission" />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="mission-content">
                <Title level={2} className="gradient-text">
                  Our Mission
                </Title>
                <Paragraph className="mission-text">
                  At Shortify, we believe in making the internet more accessible and manageable. Our
                  mission is to simplify link sharing while providing powerful analytics and tools
                  that help individuals and businesses optimize their online presence.
                </Paragraph>
                <Paragraph className="mission-text">
                  We started in 2018 with a simple idea: what if sharing links could be easier and
                  more insightful? Today, we've helped millions of users share billions of links,
                  and we're just getting started.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>

        {/* Values Section */}
        <div className="section values-section">
          <Title level={2} className="section-title">
            Our Values
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} lg={8}>
              <Card className="value-card">
                <div className="value-icon">
                  <RocketOutlined />
                </div>
                <Title level={4}>Innovation</Title>
                <Paragraph>
                  We constantly push boundaries to create tools that make link management more
                  efficient and insightful.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card className="value-card">
                <div className="value-icon">
                  <HeartOutlined />
                </div>
                <Title level={4}>User-Centric</Title>
                <Paragraph>
                  Every feature we build starts with understanding our users' needs and challenges.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card className="value-card">
                <div className="value-icon">
                  <GlobalOutlined />
                </div>
                <Title level={4}>Accessibility</Title>
                <Paragraph>
                  We believe in making the web more accessible for everyone, regardless of technical
                  expertise.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div className="section stats-section">
          <Row gutter={[48, 48]}>
            <Col xs={24} sm={8}>
              <div className="stat-item">
                <div className="stat-number">10M+</div>
                <div className="stat-label">Active Users</div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="stat-item">
                <div className="stat-number">5B+</div>
                <div className="stat-label">Links Shortened</div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="stat-item">
                <div className="stat-number">190+</div>
                <div className="stat-label">Countries Served</div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </LayoutHoc>
  );
};

export default AboutUs;
