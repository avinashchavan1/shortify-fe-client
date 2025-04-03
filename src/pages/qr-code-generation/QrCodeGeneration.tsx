import React, { useState } from 'react';
import { Input, Button, Card, Space, Typography, Divider } from 'antd';
import { QRCode } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LayoutHoc from '../../layouts/Layout';
import { AppRouterConstants } from '../../components/core/AppRouter.contants';
import { isValidURL } from '../../utils/helpers';

const { Title, Text } = Typography;




const QrCodeGeneration = () => {
    const [shortenedLink, setShortenedLink] = useState('');
    const [qrValue, setQrValue] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormTouched, setIsFormTouched] = useState(false)

    const handleOnchageShortendLink = (value: string) => {
        console.log("value", value)
        setShortenedLink(value);
        setIsFormTouched(true);
        setIsFormValid(isValidURL(value))

    }

    console.log('isformValid', isFormValid);
    const generateQRCode = () => {
        if (shortenedLink) {
            setQrValue(shortenedLink.startsWith('http') ? shortenedLink : `https://${shortenedLink}`);
        }
    };

    const handleDownload = () => {
        const canvas = document.getElementById('qrcode-canvas')?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.download = `${shortenedLink.replace(/[^a-zA-Z0-9]/g, '_')}_qrcode.png`;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <LayoutHoc>
            <div
                style={{
                    padding: '20px',
                    maxWidth: '800px',
                    margin: '0 auto',
                    minHeight: '60vh',
                    marginTop: '50px',
                }}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link to={AppRouterConstants.HOME}>
                            <Button
                                type="text"
                                icon={<ArrowLeftOutlined />}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                Back to Links
                            </Button>
                        </Link>
                        <Title level={4} style={{ margin: 0 }}>
                            QR Code Generator
                        </Title>
                        <div style={{ width: 100 }}></div> {/* For balance */}
                    </div>

                    <Card
                        style={{
                            borderRadius: '8px',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        }}
                    >
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ width: '100%' }}
                        >
                            <div>
                                <Text strong>Enter Shortened Link</Text>
                                <Input
                                    placeholder="e.g., bit.ly/example"
                                    value={shortenedLink}
                                    onChange={(e) => handleOnchageShortendLink(e.target.value)}
                                    style={{ marginTop: '8px', borderRadius: '4px' }}
                                    prefix={<span style={{ color: '#6366f1' }}>🔗</span>}
                                    status={!isFormTouched ? '' : isFormValid ? '' : 'error'}
                                />
                            </div>

                            <Button
                                type="primary"
                                onClick={generateQRCode}
                                style={{
                                    backgroundColor: '##1890ff',
                                    borderColor: '##1890ff',
                                    borderRadius: '4px',
                                    width: '100%',
                                }}
                                disabled={!isFormValid}
                            >
                                Generate QR Code
                            </Button>
                        </Space>
                    </Card>

                    {qrValue && (
                        <Card
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center',
                            }}
                        >
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{ width: '100%' }}
                            >
                                <Title level={5}>Your QR Code</Title>
                                <div
                                    id="qrcode-canvas"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <QRCode
                                        value={qrValue}
                                        size={200}
                                        bordered={false}
                                        color="#000"
                                    />
                                </div>
                                <Text type="secondary">{qrValue}</Text>
                                <Divider style={{ margin: '16px 0' }} />
                                <Button
                                    onClick={handleDownload}
                                    style={{
                                        backgroundColor: '#1890ff',
                                        borderColor: '#1890ff',
                                        borderRadius: '4px',
                                        color: 'white',
                                    }}
                                >
                                    Download QR Code
                                </Button>
                            </Space>
                        </Card>
                    )}
                </Space>
            </div>
        </LayoutHoc>
    );
};

export default QrCodeGeneration;
