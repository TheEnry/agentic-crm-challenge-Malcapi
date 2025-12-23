import { Deal } from '@/crm/types/deal';
import { getDatabase, saveDatabase } from './database';
import { QueryOptions, QueryResult } from './types';

function serializeDeal(deal: Deal): Record<string, string | number | null> {
  return {
    id: deal.id,
    title: deal.title,
    content: deal.content,
    companyIds: deal.companyIds ? JSON.stringify(deal.companyIds) : null,
    contactIds: deal.contactIds ? JSON.stringify(deal.contactIds) : null,
    dealIds: deal.dealIds ? JSON.stringify(deal.dealIds) : null,
    userName: deal.userName,
    dueAt: deal.dueAt.toISOString(),
    completedAt: deal.completedAt ? deal.completedAt.toISOString() : null,
    completedBy: deal.completedBy || null,
    assignedContactIds: deal.assignedContactIds ? JSON.stringify(deal.assignedContactIds) : null,
    status: deal.status || null,
    priority: deal.priority || null,
    comments: deal.comments || null,
    amount: deal.amount || null,
    currency: deal.currency || null,
    paymentDate: deal.paymentDate ? deal.paymentDate.toISOString() : null,
    paymentType: deal.paymentType || null,
    contractNumber: deal.contractNumber || null,
    discount: deal.discount || null,
    avatar: deal.avatar || null,
    createdAt: deal.createdAt.toISOString(),
    updatedAt: deal.updatedAt.toISOString(),
  };
}

function deserializeDeal(row: Record<string, string | number>): Deal {
  return {
    id: row.id as string,
    title: row.title as string,
    content: row.content as string,
    companyIds: row.companyIds ? JSON.parse(row.companyIds as string) : undefined,
    contactIds: row.contactIds ? JSON.parse(row.contactIds as string) : undefined,
    dealIds: row.dealIds ? JSON.parse(row.dealIds as string) : undefined,
    userName: row.userName as string,
    dueAt: new Date(row.dueAt as string),
    completedAt: row.completedAt ? new Date(row.completedAt as string) : undefined,
    completedBy: (row.completedBy as string) || undefined,
    assignedContactIds: row.assignedContactIds ? JSON.parse(row.assignedContactIds as string) : undefined,
    status: (row.status as Deal['status']) || undefined,
    priority: (row.priority as Deal['priority']) || undefined,
    comments: (row.comments as number) || undefined,
    amount: (row.amount as number) || undefined,
    currency: (row.currency as Deal['currency']) || undefined,
    paymentDate: row.paymentDate ? new Date(row.paymentDate as string) : undefined,
    paymentType: (row.paymentType as Deal['paymentType']) || undefined,
    contractNumber: (row.contractNumber as string) || undefined,
    discount: (row.discount as number) || undefined,
    avatar: (row.avatar as string) || undefined,
    createdAt: new Date(row.createdAt as string),
    updatedAt: new Date(row.updatedAt as string),
  };
}

export function createDeal(deal: Deal): Deal {
  const db = getDatabase();
  const data = serializeDeal(deal);

  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data)
    .map(() => '?')
    .join(', ');
  const values = Object.values(data);

  db.run(`INSERT INTO deals (${columns}) VALUES (${placeholders})`, values);
  saveDatabase();

  return deal;
}

export function getDeal(id: string): Deal | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM deals WHERE id = ?', [id]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0];
  const deal: Record<string, string | number> = {};
  row.columns.forEach((col, idx) => {
    deal[col] = row.values[0][idx] as string | number;
  });

  return deserializeDeal(deal);
}

export function getAllDeals(options?: QueryOptions): QueryResult<Deal> {
  const db = getDatabase();
  const { limit, offset, orderBy = 'createdAt', orderDirection = 'DESC' } = options || {};

  let query = `SELECT * FROM deals ORDER BY ${orderBy} ${orderDirection}`;
  const params: (string | number)[] = [];

  if (limit !== undefined) {
    query += ' LIMIT ?';
    params.push(limit);
  }

  if (offset !== undefined) {
    query += ' OFFSET ?';
    params.push(offset);
  }

  const result = db.exec(query, params);
  const countResult = db.exec('SELECT COUNT(*) as total FROM deals');

  const deals: Deal[] = [];
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0];
    row.values.forEach((values) => {
      const deal: Record<string, string | number> = {};
      row.columns.forEach((col, idx) => {
        deal[col] = values[idx] as string | number;
      });
      deals.push(deserializeDeal(deal));
    });
  }

  const total = countResult.length > 0 ? (countResult[0].values[0][0] as number) : 0;

  return { data: deals, total };
}

export function updateDeal(id: string, updates: Partial<Deal>): Deal | null {
  const db = getDatabase();
  const existing = getDeal(id);

  if (!existing) {
    return null;
  }

  const updated: Deal = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date(),
  };

  const data = serializeDeal(updated);
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = [...Object.values(data), id];

  db.run(`UPDATE deals SET ${setClause} WHERE id = ?`, values);
  saveDatabase();

  return updated;
}

export function deleteDeal(id: string): boolean {
  const db = getDatabase();
  db.run('DELETE FROM deals WHERE id = ?', [id]);
  saveDatabase();

  return true;
}
