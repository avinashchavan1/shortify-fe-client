import { Form, Input, Button, Typography, Row, Col, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { AppRouterConstants } from '../../components/core/AppRouter.contants';
import PublicPageLayout from '../../layouts/PublicPageLayout';
import HttpClient from '../../components/core/http-client/HttpClient';
import {
  HTTP_ACCESS_TOKEN_COOKIE_NAME,
  HttpUrlLinks,
} from '../../components/core/http-client/HttpClient.constants';
import { AppDispatch } from '../../components/app/store/store';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from './UserState.Slice';
import { useDispatch } from 'react-redux';

import './SignIn.css';
import { useState } from 'react';

import styles from './SignIn.module.scss';

const { Title, Text, Link } = Typography;

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const params = new URLSearchParams(window.location.search);
  const previousPageRedirect = params.get('state') ?? '';
  const decodedUrl = decodeURIComponent(atob(previousPageRedirect));
  const [loading, setLoading] = useState(false);
  const redirectUrl = !!previousPageRedirect.length ? decodedUrl : AppRouterConstants.HOME;

  const onFinish = async (values: any) => {
    const requestData = {
      url: HttpUrlLinks.login,
      data: values,
    };
    setLoading(true);
    try {
      const data: {
        token: string;
        refreshToken: string;
      } = await HttpClient.POST(requestData);
      // set localStorage with token and refreshToken
      localStorage.setItem(HTTP_ACCESS_TOKEN_COOKIE_NAME, data.token);
      dispatch(fetchUser());
      navigate(redirectUrl, { replace: true });
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <PublicPageLayout>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: '100vh' }}
        className="account-page-background"
      >
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card className="form-card">
            <div className={styles.signInLogo}>
              <img src="/appLogo.svg" alt="ShortURL Logo" />
            </div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 8 }}>
                Let's start
              </Title>
              <Text>login to your account to start shortening links!</Text>
            </div>

            <Form
              name="account_form"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Your Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please create a password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  Sign in
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                <Text>New user, lets get started </Text>{' '}
                <Link href={AppRouterConstants.REGISTER}>Sign Up</Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </PublicPageLayout>
  );
};
