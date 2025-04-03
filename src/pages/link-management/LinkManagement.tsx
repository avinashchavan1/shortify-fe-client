import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Input, Space, TableColumnType, InputRef, TableProps } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import LayoutHoc from '../../layouts/Layout';
import Title from 'antd/es/typography/Title';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

enum LinkStatus {
    ACTIVE = "active",
    EXPIRED = "expired",
    SUSPENDED = 'suspended'
}

interface TTableData {
    key: string;
    shortenedLink: string;
    originalURL: string;
    creationDate: string;
    expirationDate: string;
    notes: string;
    action: string;
    status: LinkStatus
}

interface TPagination {
    current: number;
    pageSize: number;
    total: number;
}

interface ISort {
    column: {
        columnKey: string;
        field: string;
        order: string
    }
}

const data: TTableData[] = [
    {
        key: '1',
        shortenedLink: 'bit.ly/example',
        originalURL: 'https://www.example.com',
        creationDate: '2023-01-15',
        expirationDate: '2024-01-15',
        notes: '/',
        action: 'Edit',
        status: LinkStatus.ACTIVE,
    },
    {
        key: '2',
        shortenedLink: 'tinyurl.com/test',
        originalURL: 'https://www.testpage.com',
        creationDate: '2023-02-10',
        expirationDate: '2024-02-10',
        notes: '/',
        action: 'Delete',
        status: LinkStatus.EXPIRED,
    },
    {
        key: '3',
        shortenedLink: 'shrtcode.com/abc123',
        originalURL: 'https://www.abc123.com',
        creationDate: '2023-03-05',
        expirationDate: '2024-03-05',
        notes: 'h',
        action: 'Restore',
        status: LinkStatus.SUSPENDED,
    },

    {
        key: '4',
        shortenedLink: 'linktree.com/xyz',
        originalURL: 'https://www.xyzlink.com',
        creationDate: '2023-01-20',
        expirationDate: '2024-01-20',
        notes: 'r',
        action: 'Edit',
        status: LinkStatus.EXPIRED,
    },
    {
        key: '5',
        shortenedLink: 'is.gd/example2',
        originalURL: 'https://www.example2.com',
        creationDate: '2023-03-15',
        expirationDate: '2024-03-15',
        notes: '/',
        action: 'View',
        status: LinkStatus.ACTIVE,
    },
    {
        key: '6',
        shortenedLink: 'ow.ly/some-long-link',
        originalURL: 'https://www.some-long-link.com',
        creationDate: '2023-04-01',
        expirationDate: '2024-04-01',
        notes: 'r',
        action: 'Delete',
        status: LinkStatus.ACTIVE,
    },
    {
        key: '7',
        shortenedLink: 'lnk.to/short',
        originalURL: 'https://www.linkto.com',
        creationDate: '2023-04-10',
        expirationDate: '2024-04-10',
        notes: '/',
        action: 'Edit',
        status: LinkStatus.ACTIVE,
    },
];

const compareData = (a: string, b: string) => {
    const aDate = new Date(a);
    const bDate = new Date(b);

    return aDate.getDate() < bDate.getDate();
};






type OnChange = NonNullable<TableProps<TTableData>['onChange']>;

type Filters = Parameters<OnChange>[1];

export const LinkManagement: React.FC = () => {
    const [sorter, setSorter] = useState<ISort>({
        column: {
            columnKey: "shortenedLink",
            field: "shortenedLink",
            order: "ascend"
        }
    });
    const [pagination, setPagination] = useState<TPagination>({
        current: 1,
        pageSize: 7,
        total: 100,
    });

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});


    useEffect(() => {
        console.log('useffect ', pagination, filteredInfo, sorter);
    }, [pagination, filteredInfo, sorter]);

    const handleTableChange = (
        pagination: TPagination,
        filters: Filters,
        sorter: ISort,
    ) => {
        setPagination(pagination);
        setFilteredInfo(filters);
        setSorter(sorter);
    };




    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: string,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };


    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };


    const getColumnSearchProps = (dataIndex: string): TableColumnType<TTableData> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
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
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const generateLinkActions = (status: LinkStatus) => {
        switch (status) {
            case LinkStatus.ACTIVE:
                return "Deactivate";
            case LinkStatus.EXPIRED:
                return "Delete";
            case LinkStatus.SUSPENDED:
                return "Activate";
            default:
                return ""
        }
    }

    const generateButtonColorByStatus = (status: LinkStatus) => {


        switch (status) {
            case LinkStatus.ACTIVE:
                return 'rgb(207,216,231)';
            case LinkStatus.EXPIRED:
                return 'rgb(245,209,209)';
            case LinkStatus.SUSPENDED:
                return 'rgb(226,259,229)';
            default:
                return 'black';
        }

    }

    const generateColorBasedOnStatus = (status: LinkStatus) => {
        switch (status) {
            case LinkStatus.ACTIVE:
                return 'rgb(226,259,229)';
            case LinkStatus.EXPIRED:
                return 'rgb(245,209,209)';
            case LinkStatus.SUSPENDED:
                return 'rgb(207,216,231)';
            default:
                return 'black';
        }
    };


    const columns = [
        {
            title: 'Shortened Link',
            dataIndex: 'shortenedLink',
            key: 'shortenedLink',
            sorter: (a: TTableData, b: TTableData) =>
                a.shortenedLink.localeCompare(b.shortenedLink),
            ...getColumnSearchProps('shortenedLink'),
        },
        {
            title: 'Original URL',
            dataIndex: 'originalURL',
            key: 'originalURL',
            sorter: (a: TTableData, b: TTableData) =>
                a.originalURL.localeCompare(b.originalURL),
            ...getColumnSearchProps('originalURL'),
        },
        {
            title: 'Creation Date',
            dataIndex: 'creationDate',
            key: 'creationDate',
            sorter: (a: TTableData, b: TTableData) =>
                compareData(a.creationDate, b.creationDate),
        },
        {
            title: 'Expiration Date',
            dataIndex: 'expirationDate',
            key: 'expirationDate',
            sorter: (a: TTableData, b: TTableData) =>
                compareData(a.expirationDate, b.expirationDate),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (data: string) => (
                <Button
                    style={{
                        backgroundColor: generateColorBasedOnStatus(data as LinkStatus),
                    }}
                    variant="solid"
                >
                    {data === LinkStatus.ACTIVE ? 'Active' : 'Expired'}{' '}
                </Button>
            ),
            filters: [
                { text: 'Active', value: LinkStatus.ACTIVE },
                {
                    text: 'Expired',
                    value: LinkStatus.EXPIRED,
                },
                { text: 'Suspended', value: LinkStatus.SUSPENDED },
            ],
            // filteredValue: filteredInfo.name || null,
            onFilter: (value: string, record: TTableData) =>
                record.status.includes(value as string),
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            render: (data: TTableData) => (
                <Input
                    prefix={<span style={{ color: '#ccc' }}></span>}
                    defaultValue={data.notes}
                    style={{ borderRadius: '4px' }}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: TTableData) => (
                <Button
                    style={{
                        backgroundColor: generateButtonColorByStatus(record.status),
                        borderColor: generateButtonColorByStatus(record.status),
                        width: '80px',
                    }}
                >
                    {generateLinkActions(record.status)}
                </Button>
            ),
        },
    ];






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
                        <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                            All Links
                        </span>
                        <FilterOutlined />
                    </div>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: '#6366f1',
                            borderColor: '#6366f1',
                            borderRadius: '4px',
                        }}
                    >
                        + Add New Link
                    </Button>
                </div>
                <Table
                    // @ts-expect-error
                    columns={columns}
                    dataSource={data}
                    pagination={pagination}
                    // @ts-expect-error
                    onChange={handleTableChange}
                    bordered={false}
                    rowClassName={() => 'custom-row'}
                />
            </div>
        </LayoutHoc>
    );
};
