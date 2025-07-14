import { LinkStatus } from './LinkManagement.constants';

export type TLinkResponse = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  status: LinkStatus;
  uniqueKey: string;
  createdAt: string; // ISO date string
  visitCount: number;
};

export interface TTableData {
  key: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
  expirationDate: string;
  notes: string;
  action: string;
  status: LinkStatus;
  visitCount: number;
}

export interface TPagination {
  current: number;
  pageSize: number;
  total: number;
}

export interface ISort {
  columnKey: string;
  field: string;
  order: string;
}

export type TTableResponseData = {
  content: TLinkResponse[];
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
};
