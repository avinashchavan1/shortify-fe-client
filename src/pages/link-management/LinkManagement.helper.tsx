import { FilterValue } from 'antd/es/table/interface';
import {
  LinkManagementColumns,
  LinkManagementColumnsNames,
  LinkStatus,
} from './LinkManagement.constants';
import styles from './LinkManagement.module.scss';
import { TTableData } from './LinkManagement.types';
import { Button, TableColumnType } from 'antd';
import HttpClient from '../../components/core/http-client/HttpClient';
import { HttpUrlLinks } from '../../components/core/http-client/HttpClient.constants';
import toast from 'react-hot-toast';
import { DeleteOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

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

export const compareDate = (a: string, b: string) => {
  const aDate = new Date(a);
  const bDate = new Date(b);

  return aDate.getDate() < bDate.getDate();
};

export interface ILinkManagementTableColumnsProps {
  getColumnSearchProps: (dataIndex: string) => TableColumnType<TTableData>;
  refreshData: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const linkManagementTableColumns = (props: ILinkManagementTableColumnsProps) => {
  const { getColumnSearchProps, refreshData, setLoading } = props;
  const currentProtocol = window.location.protocol;
  const handleOnclick = async (record: TTableData, incomingAction: TableActionType) => {
    setLoading(true);
    try {
      await handleAction(record, incomingAction);
      await refreshData();
    } catch (error) {
      toast.error((error as string).toString());
    }
    setLoading(false);
  };
  return [
    {
      title: LinkManagementColumnsNames[LinkManagementColumns.ORIGINAL_URL],
      dataIndex: LinkManagementColumns.ORIGINAL_URL,
      key: LinkManagementColumns.ORIGINAL_URL,
      render: (text: string) => <div className={styles.truncate}>{text}</div>,
      sorter: (a: TTableData, b: TTableData) => a.originalUrl.localeCompare(b.originalUrl),

      ...getColumnSearchProps(LinkManagementColumns.ORIGINAL_URL),
    },
    {
      title: LinkManagementColumnsNames[LinkManagementColumns.SHORT_URL],
      dataIndex: LinkManagementColumns.SHORT_URL,
      key: LinkManagementColumns.SHORT_URL,
      sorter: true,
      ...getColumnSearchProps(LinkManagementColumns.SHORT_URL),
      render: (text: string) => (
        <a href={`${currentProtocol}//${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },

    {
      title: LinkManagementColumnsNames[LinkManagementColumns.STATUS],
      dataIndex: LinkManagementColumns.STATUS,
      key: LinkManagementColumns.STATUS,
      render: (data: string) => (
        <Button
          style={{
            backgroundColor: generateColorBasedOnStatus(data as LinkStatus),
            width: '100px',
          }}
        >
          {capitalizeFirstLetter(data)}
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
      onFilter: (value: string, record: TTableData) => record.status.includes(value as string),
      sorter: true,
    },
    {
      title: LinkManagementColumnsNames[LinkManagementColumns.CREATION_DATE],
      dataIndex: LinkManagementColumns.CREATION_DATE,
      key: LinkManagementColumns.CREATION_DATE,
      sorter: true,
    },
    {
      title: LinkManagementColumnsNames[LinkManagementColumns.VISITS],
      dataIndex: LinkManagementColumns.VISITS,
      key: LinkManagementColumns.VISITS,
      sorter: true,
    },
    {
      title: LinkManagementColumnsNames[LinkManagementColumns.ACTIONS],
      key: LinkManagementColumns.ACTIONS,
      render: (_: any, record: TTableData) => (
        <div>
          {record.status === LinkStatus.SUSPENDED && (
            <PlayCircleOutlined
              style={{ fontSize: '22px', color: '#08c' }}
              onClick={() => handleOnclick(record, TableActionType.ACTIVATE)}
            />
          )}{' '}
          {record.status === LinkStatus.ACTIVE && (
            <PauseCircleOutlined
              style={{ fontSize: '22px', color: 'grey' }}
              onClick={() => handleOnclick(record, TableActionType.SUSPEND)}
            />
          )}{' '}
          {(record.status === LinkStatus.ACTIVE || record.status === LinkStatus.SUSPENDED) && (
            <DeleteOutlined
              color="red"
              style={{ fontSize: '22px', color: 'red' }}
              onClick={() => handleOnclick(record, TableActionType.DELETE)}
            />
          )}
        </div>
      ),
    },
  ];
};

export type IRespStatus = {
  code: number;
  message: string;
};

export const handleAction = async (record: TTableData, incomingAction: TableActionType | '') => {
  console.log('handleAction', record, incomingAction);
  switch (incomingAction) {
    case TableActionType.DELETE:
      const deleteResponse = (
        await HttpClient.DELETE<IRespStatus>(HttpUrlLinks.urlDetails(record.key))
      ).data;
      console.log('resp', deleteResponse);
      toast.error(`${record.shortUrl} deleted successfully.`);
      return;
    case TableActionType.SUSPEND:
      const suspendResponse = await HttpClient.PUT<IRespStatus>(
        HttpUrlLinks.suspendUrl(record.key)
      );
      console.log('suspendresopnse', suspendResponse);
      toast.success(`${record.shortUrl} suspended successfully.`);

      return;
    case TableActionType.ACTIVATE:
      const activateResponse = await HttpClient.PUT<IRespStatus>(
        HttpUrlLinks.activateUrl(record.key)
      );
      console.log('suspendresopnse', activateResponse);
      toast.success(`${record.shortUrl} activated successfully.`);

      return;
  }
};

export enum TableActionType {
  DELETE = 'delete',
  ACTIVATE = 'activate',
  SUSPEND = 'suspend',
}

export const createFilterString = (newFilters: Record<string, FilterValue | null>) => {
  const validFilters = (newFilters ? Object.keys(newFilters) : []).filter(Boolean);
  let filterString: string = '';
  validFilters.forEach(val => {
    const value = newFilters[val];
    if (Array.isArray(value)) {
      // filterMap[val] = value[0] as string;
      filterString = `&${val}=${value[0]}`;
    }
  });
  return filterString;
};
