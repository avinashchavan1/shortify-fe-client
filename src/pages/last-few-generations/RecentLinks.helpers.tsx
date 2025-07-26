import toast from 'react-hot-toast';

// Helper for truncating URLs
export const truncateUrl = (url: string, max = 40) =>
  url.length > max ? url.slice(0, max) + '...' : url;

// Helper for relative time
export const timeAgo = (dateStr: string) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const handleCopy = async (url: string) => {
  await navigator.clipboard.writeText(url);
  toast.success('Short URL copied!');
};
