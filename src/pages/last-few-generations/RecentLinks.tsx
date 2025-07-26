import { Card, List, Tooltip, Button, Typography, Space } from 'antd';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import { handleCopy, timeAgo, truncateUrl } from './RecentLinks.helpers';

const { Text } = Typography;

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
