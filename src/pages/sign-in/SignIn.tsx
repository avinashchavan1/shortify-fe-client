import { Form, Input, Button, Typography, Row, Col, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './SignIn.css';
import { AppRouterConstants } from '../../components/core/AppRouter.contants';
import PublicPageLayout from '../../layouts/PublicPageLayout';

const { Title, Text, Link } = Typography;

export const SignIn = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email address!' },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder="Your email address"
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
                                    style={{ height: '40px', backgroundColor: '#1890ff' }}
                                >
                                    Sign in
                                </Button>
                            </Form.Item>

                            <div style={{ textAlign: 'center' }}>
                                <Text>New user, lets get started </Text> <Link href={AppRouterConstants.REGISTER}>Sign Up</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PublicPageLayout>
    );
};

