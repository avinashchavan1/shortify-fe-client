import { Form, Input, Button, Checkbox, Typography, Row, Col, Card, Divider } from 'antd';
import { MailOutlined, LockOutlined, IdcardOutlined, UserOutlined } from '@ant-design/icons';
import './SignUp.css';
import { AppRouterConstants } from '../../components/core/AppRouter.contants';
import PublicPageLayout from '../../layouts/PublicPageLayout';
import HttpClient from '../../components/core/http-client/HttpClient';
import { HttpUrlLinks } from '../../components/core/http-client/HttpClient.constants';
import { getValue } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TFormData, TResponseSaveUser } from './SignUp.types';
import { SignUpFormFields } from './SignUp.constants';
import googleLogo from '../../../public/google.svg';

const { Title, Text, Link } = Typography;

export const userNameRules = [
  { required: true, message: 'Please input username!' },
  { min: 8, message: 'Username must be at least 8 characters long!' },
  { max: 10, message: 'Username cannot exceed 10 characters!' },
  { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be alphanumeric!' },
  { pattern: /^[a-zA-Z]/, message: 'Username must start with a letter!' },
  {
    pattern: /^(?!.*__).*$/,
    message: 'Username cannot contain consecutive underscores!',
  },
  {
    pattern: /^(?!.*_$)/,
    message: 'Username cannot end with an underscore!',
  },
  {
    pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,10}$/,
    message: 'Must have at least one letter and one number!',
  },
];

export const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = async (values: TFormData) => {
    const requestData = {
      url: HttpUrlLinks.register,
      data: values,
    };
    try {
      await HttpClient.POST<TResponseSaveUser>(requestData);
      toast.success('Account created successfully! Please log in.');
      navigate(AppRouterConstants.LOGIN);
    } catch (error) {
      const message = getValue(error, 'response.data.message', 'Something went wrong');
      console.log('Error:', message);
      return;
    }
  };

  // const handleLoginWithGoogle = () => {
  //   window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  // };

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
            {/* <div className={stylesSignIn.signInLogo}>
              <img src="/appLogo.svg" alt="ShortURL Logo" />
            </div> */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 8 }}>
                Create Account
              </Title>
              <Text>Create your account to start shortening links!</Text>
            </div>

            <Form
              name="account_form"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name={SignUpFormFields.NAME}
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Your name"
                />
              </Form.Item>

              <Form.Item name={SignUpFormFields.USERNAME} rules={userNameRules}>
                <Input
                  prefix={<IdcardOutlined className="site-form-item-icon" />}
                  placeholder="Your username"
                />
              </Form.Item>

              <Form.Item
                name={SignUpFormFields.EMAIL}
                rules={[
                  { required: true, message: 'Please input your email address!' },
                  { type: 'email', message: 'Please input a valid email address!' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Your email address"
                />
              </Form.Item>

              <Form.Item
                name={SignUpFormFields.PASSWORD}
                rules={[{ required: true, message: 'Please create a password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Create a password"
                />
              </Form.Item>

              <Form.Item
                name={SignUpFormFields.CONFIRM_PASSWORD}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue(SignUpFormFields.PASSWORD) === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Re-enter your password"
                />
              </Form.Item>

              <Form.Item
                name={SignUpFormFields.AGREEMENT}
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('You must agree to the Terms & Conditions')),
                  },
                ]}
              >
                <Checkbox>I agree with Terms & Conditions</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: '40px', backgroundColor: '#1890ff' }}
                >
                  Create Account
                </Button>
                <Divider style={{ margin: '16px 0' }}>Or </Divider>
                <Button
                  type="primary"
                  htmlType="button"
                  block
                  style={{
                    backgroundColor: 'white',
                    color: '#000',
                    borderColor: '#d9d9d9',
                  }}
                >
                  {
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img
                        src={googleLogo}
                        alt="Google Logo"
                        style={{
                          height: 16,
                        }}
                      />

                      <a href={import.meta.env.VITE_OAUTH2_GOOGLE_URL}>Continue with Google</a>
                    </div>
                  }
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                <Text>Already registered?</Text>{' '}
                <Link href={AppRouterConstants.LOGIN}>Sign In</Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </PublicPageLayout>
  );
};
