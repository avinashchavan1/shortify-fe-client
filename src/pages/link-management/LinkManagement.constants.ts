export enum LinkStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended',
}

export enum LinkManagementColumns {
  ORIGINAL_URL = 'originalUrl',
  SHORT_URL = 'shortUrl',
  CREATION_DATE = 'createdAt',
  STATUS = 'status',
  NOTES = 'notes',
  ACTIONS = 'actions',
  VISITS = 'visitCount',
}

export const LinkManagementColumnsNames = {
  [LinkManagementColumns.ORIGINAL_URL]: 'Original URL',
  [LinkManagementColumns.SHORT_URL]: 'Shortened Link',
  [LinkManagementColumns.CREATION_DATE]: 'Creation Date',
  [LinkManagementColumns.STATUS]: 'Status',
  [LinkManagementColumns.NOTES]: 'Notes',
  [LinkManagementColumns.ACTIONS]: 'Actions',
  [LinkManagementColumns.VISITS]: 'Visits',
};
