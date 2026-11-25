/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'bn' | 'en';

export interface ServiceItem {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  category: string;
  categoryEn?: string;
  iconName: string;
  active: boolean;
  fields?: ServiceField[];
}

export interface ServiceField {
  id: string;
  label: string;
  labelEn?: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
  placeholder?: string;
  placeholderEn?: string;
}

export interface Order {
  id: string;
  userId: string;
  userPhone: string;
  serviceId: string;
  serviceTitle: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  submittedData: Record<string, string>;
  createdAt: string;
  adminNote?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  userPhone: string;
  amount: number;
  type: 'recharge' | 'spend' | 'refund';
  method: string;
  senderNumber: string;
  trxId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface AppSettings {
  announcementText: string;
  announcementTextEn?: string;
  showAnnouncement: boolean;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  whatsappNumber: string;
  maintenanceMode: boolean;
}
