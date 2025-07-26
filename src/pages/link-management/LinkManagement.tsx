import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Input, Space, TableColumnType, InputRef, TableProps, Spin } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import LayoutHoc from '../../layouts/Layout';
import Title from 'antd/es/typography/Title';
import { FilterDropdownProps } from 'antd/es/table/interface';
import HttpClient from '../../components/core/http-client/HttpClient';
import { HttpUrlLinks } from '../../components/core/http-client/HttpClient.constants';

import { BarLoader } from 'react-spinners';
import {
  ISort,
  TLinkResponse,
  TPagination,
  TTableData,
  TTableResponseData,
} from './LinkManagement.types';
import { createFilterString, linkManagementTableColumns } from './LinkManagement.helper';
import { formatDate } from '../../utils/helpers';
import { LinkManagementColumns } from './LinkManagement.constants';

import { useNavigate } from 'react-router-dom';
import { AppRouterConstants } from '../../components/core/AppRouter.contants';

type OnChange = NonNullable<TableProps<TTableData>['onChange']>;

type Filters = Parameters<OnChange>[1];

export enum SortOrder {
  ASC = 'ascend',
  DESC = 'descend',
}

export const LinkManagement: React.FC = () => {
  const [localSorter, setLocalSorter] = useState<ISort>({
    columnKey: LinkManagementColumns.CREATION_DATE,
    field: LinkManagementColumns.CREATION_DATE,
    order: SortOrder.DESC,
  });
  const [pagination, setPagination] = useState<TPagination>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [dataSource, setDataSource] = useState<TTableData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchData = async (newPagination: TPagination, newFilters: Filters, newSorter: ISort) => {
    const stringfiedFilter = createFilterString(newFilters);

    setLoading(true);
    const getAllUrlsByPage = ((await HttpClient.GET<TTableResponseData>(
      HttpUrlLinks.getAllByPageAndFilter(
        newPagination.current,
        newPagination.pageSize,
        newSorter.columnKey,
        newSorter.order === SortOrder.DESC ? 'desc' : 'asc',
        stringfiedFilter
      )
    )) ?? []) as unknown as TTableResponseData;

    const allUrls = getAllUrlsByPage.content ?? [];

    const formattedData: TTableData[] = allUrls.map((item: TLinkResponse) => ({
      key: item.id,
      shortUrl: item.shortUrl,
      originalUrl: item.originalUrl,
      createdAt: formatDate(item.createdAt), // Placeholder for creation date
      expirationDate: new Date().toLocaleDateString(), // Placeholder for expiration date
      notes: item.uniqueKey || '',
      action: 'Edit', // Placeholder for action
      status: item.status,
      visitCount: item.visitCount,
    }));

    setDataSource(formattedData);

    setPagination(prev => ({
      ...prev,
      total: getAllUrlsByPage.totalElements,
    }));
    setLoading(false);
  };

  const refreshData = async () => {
    try {
      await fetchData(pagination, filteredInfo, localSorter);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setLoading(true);
    // fetchData(pagination, {}, localSorter);
    refreshData();
    // setLoading(false);
  }, []);

  const handleTableChange = (pagination: TPagination, filters: Filters, sorter: ISort) => {
    const updatedSorter: ISort = Object.keys(sorter).length ? sorter : localSorter;
    setPagination(pagination);
    setFilteredInfo(filters);
    setLocalSorter(updatedSorter);
    fetchData(pagination, filters, updatedSorter);
  };

  const handleSearch = (
    _selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    _dataIndex: string
  ) => {
    confirm();

    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    // setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: string): TableColumnType<TTableData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      // @ts-ignore
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });

  const columns = linkManagementTableColumns({ getColumnSearchProps, refreshData, setLoading });

  return (
    <LayoutHoc>
      <div style={{ padding: '40px' }}>
        <Title level={2} className="section-title">
          Manage your data
        </Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>All Links</span>
            <FilterOutlined />
          </div>
          <Button
            type="primary"
            style={{
              backgroundColor: '#6366f1',
              borderColor: '#6366f1',
              borderRadius: '4px',
            }}
            onClick={() => navigate(AppRouterConstants.HOME)}
          >
            + Add New Link
          </Button>
        </div>

        <Spin spinning={isLoading} indicator={<BarLoader color="#1677ff" />}>
          <Table
            scroll={{ x: 'max-content' }}
            //@ts-expect-error
            columns={columns}
            dataSource={dataSource}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showTotal: total => ` ${total} items`,
            }}
            // @ts-expect-error
            onChange={handleTableChange}
            bordered={false}
            rowClassName={() => 'custom-row'}
          />
        </Spin>
      </div>
    </LayoutHoc>
  );
};

export default LinkManagement;
