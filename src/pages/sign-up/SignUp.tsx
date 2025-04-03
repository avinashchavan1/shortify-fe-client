import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Row, Col, Card, Layout } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './SignUp.css';
import { AppRouterConstants } from '../../components/core/AppRouter.contants';
import PublicPageLayout from '../../layouts/PublicPageLayout';

const { Title, Text, Link } = Typography;

export const SignUp = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <PublicPageLayout >

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
                                    placeholder="Create a password"
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error('The two passwords do not match!'),
                                            );
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
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                    new Error('You must agree to the Terms & Conditions'),
                                                ),
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
                            </Form.Item>

                            <div style={{ textAlign: 'center' }}>
                                <Text>Already registered?</Text> <Link href={AppRouterConstants.LOGIN}>Sign In</Link>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PublicPageLayout>
    );
};

