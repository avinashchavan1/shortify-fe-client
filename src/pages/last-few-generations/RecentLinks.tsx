import { Card, List, Tooltip, Button, Typography, Space, message } from 'antd';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Helper for truncating URLs
const truncateUrl = (url: string, max = 40) => (url.length > max ? url.slice(0, max) + '...' : url);

// Helper for relative time
const timeAgo = (dateStr: string) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export type LinkItem = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  timestamp: string;
};

export interface IRecentLink {
  links: LinkItem[];
}

const RecentLinks = ({ links }: IRecentLink) => {
  //   links = linksData || [];
  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    message.success('Short URL copied!');
  };
  const currentProtocol = window.location.protocol;
  return (
    <Card
      title="Recent Links"
      style={{ maxWidth: 600, margin: '24px auto' }}
      bodyStyle={{ padding: 0 }}
    >
      <List
        locale={{ emptyText: 'No links shortened yet.' }}
        itemLayout="horizontal"
        dataSource={links.slice(0, 5)}
        renderItem={link => (
          <List.Item
            actions={[
              <Tooltip title="Copy short URL" key="copy">
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(link.shortUrl)}
                  aria-label="Copy short URL"
                />
              </Tooltip>,
            ]}
          >
            <List.Item.Meta
              style={{ paddingLeft: '24px' }}
              title={
                <Space>
                  <Tooltip title="Open short URL" style={{ cursor: 'pointer', color: '#1677ff' }}>
                    <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                      <LinkOutlined />
                      <a
                        href={`${currentProtocol}//${link.shortUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.shortUrl}
                      </a>
                    </a>
                  </Tooltip>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {timeAgo(link.timestamp)}
                  </Text>
                </Space>
              }
              description={
                <Tooltip title={link.originalUrl}>
                  <Text>{truncateUrl(link.originalUrl)}</Text>
                </Tooltip>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentLinks;
