export interface Country {
  id: number | string,
  name: string
}

export interface Role {
  id: number | string,
  name: string
}

export interface User {
  id: string | number,
  email: string,
  firstName: string,
  lastName: string,
  title: string,
  countryId: number | string,
  languageCode: string,
  pageSize?: number,
  isDiscontinued: boolean,
  substituteUserId?: string | number
}

export interface Language {
  id: string,
  name: string
}

export interface Office {
  id: number | string,
  countryid: number | string,
  name: string
}

export interface Currency {
  id: number;
  code: string;
  exchangeRate: number;
}

export interface Requisition {
  id: number | string,
  reqNumber: string,
  title: string,
  currencyId: number,
  requiredDate: Date,
  requestedBy: string,
  requestedFor: string,
  officeId: number,
  selectionMethodId?: number,
  departmentId?: number,
  statusId: number
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Status {
  id: number,
  status: string
}

export interface ContractLineItem {
  id: number | string;
  contractId: number | string;
  amendmentId?: number | string;
  reqLineItemId: number | string;
  UOMId: number;
  quantity: number;
  optionalQuantity?: number;
  optionalUnitPrice?: number;
  needByDate: Date;
  isInKind: boolean;
  description: string;
  categoryId: number;
  statusId: number;
  unitPrice: number;
  extendedPrice: number;
  unitPriceUSD: number;
  extendedPriceUSD: number;
}

export interface Contract {
  id: number | string;
  contractNumber: string;
  vendor: number | string;
  type: 'PO' | 'FFP' | 'LH' | 'CR' | 'TM' | 'BOC' | 'IQC' | 'Lease';
  ceiling: number;
  managerId: number | string;
  currencyId: number;
  languageId: number | string;
  officeId: number | string;
  statusId: number;
  parentBOC?: number | string;
  startDate?: Date;
  endDate?: Date;
  isAutoRenewed: boolean;
  isVendorTemplateUsed: boolean;
  title?: string;
  shippingCharges: number;
  taxAmount: number;
  amount: number;
  amountUSD: number;
  departmentId?: number;
  createdDate: Date;
}