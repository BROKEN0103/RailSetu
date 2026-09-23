import { AuditLog } from '@/types';

export const auditLogs: AuditLog[] = Array.from({ length: 20 }, (_, i) => ({
  id: `log_${i + 1}`,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  userId: `usr_${(i % 10) + 1}`,
  userName: ['Admin User', 'Staff One', 'Staff Two'][i % 3] || 'System',
  action: ['USER_LOGIN', 'BOOKING_CREATED', 'BOOKING_CANCELLED', 'TRAIN_UPDATED', 'SCHEDULE_CHANGED'][i % 5],
  module: ['AUTH', 'BOOKING', 'INVENTORY', 'ADMIN'][i % 4],
  recordId: `rec_${1000 + i}`,
  details: `Action ${i + 1} performed successfully.`,
  ipAddress: `192.168.1.${(i % 255)}`,
  device: ['Chrome / Windows', 'Safari / macOS', 'App / iOS', 'App / Android'][i % 4],
  status: i % 10 === 0 ? 'failure' : 'success',
}));
