import { Company } from '@/crm/types/company';
import { getDatabase, saveDatabase } from './database';
import { QueryOptions, QueryResult } from './types';

function serializeCompany(company: Company): Record<string, string | number | null> {
  return {
    id: company.id,
    logo: company.logo || null,
    name: company.name,
    domain: company.domain || null,
    email: company.email || null,
    phone: company.phone || null,
    description: company.description || null,
    categoryIds: company.categoryIds ? JSON.stringify(company.categoryIds) : null,
    contactIds: company.contactIds ? JSON.stringify(company.contactIds) : null,
    address: company.address || null,
    state: company.state || null,
    city: company.city || null,
    zip: company.zip || null,
    country: company.country || null,
    angelList: company.angelList || null,
    linkedin: company.linkedin || null,
    connectionStrengthId: company.connectionStrengthId || null,
    x: company.x || null,
    instagram: company.instagram || null,
    facebook: company.facebook || null,
    telegram: company.telegram || null,
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
    foundedAt: company.foundedAt ? company.foundedAt.toISOString() : null,
    estimatedArrId: company.estimatedArrId || null,
    employeeRangeId: company.employeeRangeId || null,
    lastInteractionAt: company.lastInteractionAt ? company.lastInteractionAt.toISOString() : null,
    lastContacted: company.lastContacted || null,
    teamId: company.teamId || null,
    badge: company.badge ? JSON.stringify(company.badge) : null,
  };
}

function deserializeCompany(row: Record<string, string | number>): Company {
  return {
    id: row.id as string,
    logo: (row.logo as string) || undefined,
    name: row.name as string,
    domain: (row.domain as string) || undefined,
    email: (row.email as string) || undefined,
    phone: (row.phone as string) || undefined,
    description: (row.description as string) || undefined,
    categoryIds: row.categoryIds ? JSON.parse(row.categoryIds as string) : undefined,
    contactIds: row.contactIds ? JSON.parse(row.contactIds as string) : undefined,
    address: (row.address as string) || undefined,
    state: (row.state as string) || undefined,
    city: (row.city as string) || undefined,
    zip: (row.zip as string) || undefined,
    country: (row.country as string) || undefined,
    angelList: (row.angelList as string) || undefined,
    linkedin: (row.linkedin as string) || undefined,
    connectionStrengthId: (row.connectionStrengthId as string) || undefined,
    x: (row.x as string) || undefined,
    instagram: (row.instagram as string) || undefined,
    facebook: (row.facebook as string) || undefined,
    telegram: (row.telegram as string) || undefined,
    createdAt: new Date(row.createdAt as string),
    updatedAt: new Date(row.updatedAt as string),
    foundedAt: row.foundedAt ? new Date(row.foundedAt as string) : undefined,
    estimatedArrId: (row.estimatedArrId as string) || undefined,
    employeeRangeId: (row.employeeRangeId as string) || undefined,
    lastInteractionAt: row.lastInteractionAt ? new Date(row.lastInteractionAt as string) : undefined,
    lastContacted: (row.lastContacted as string) || undefined,
    teamId: (row.teamId as string) || undefined,
    badge: row.badge ? JSON.parse(row.badge as string) : undefined,
  };
}

export function createCompany(company: Company): Company {
  const db = getDatabase();
  const data = serializeCompany(company);

  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data)
    .map(() => '?')
    .join(', ');
  const values = Object.values(data);

  db.run(`INSERT INTO companies (${columns}) VALUES (${placeholders})`, values);
  saveDatabase();

  return company;
}

export function getCompany(id: string): Company | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM companies WHERE id = ?', [id]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0];
  const company: Record<string, string | number> = {};
  row.columns.forEach((col, idx) => {
    company[col] = row.values[0][idx] as string | number;
  });

  return deserializeCompany(company);
}

export function getAllCompanies(options?: QueryOptions): QueryResult<Company> {
  const db = getDatabase();
  const { limit, offset, orderBy = 'createdAt', orderDirection = 'DESC' } = options || {};

  let query = `SELECT * FROM companies ORDER BY ${orderBy} ${orderDirection}`;
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
  const countResult = db.exec('SELECT COUNT(*) as total FROM companies');

  const companies: Company[] = [];
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0];
    row.values.forEach((values) => {
      const company: Record<string, string | number> = {};
      row.columns.forEach((col, idx) => {
        company[col] = values[idx] as string | number;
      });
      companies.push(deserializeCompany(company));
    });
  }

  const total = countResult.length > 0 ? (countResult[0].values[0][0] as number) : 0;

  return { data: companies, total };
}

export function updateCompany(id: string, updates: Partial<Company>): Company | null {
  const db = getDatabase();
  const existing = getCompany(id);

  if (!existing) {
    return null;
  }

  const updated: Company = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date(),
  };

  const data = serializeCompany(updated);
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = [...Object.values(data), id];

  db.run(`UPDATE companies SET ${setClause} WHERE id = ?`, values);
  saveDatabase();

  return updated;
}

export function deleteCompany(id: string): boolean {
  const db = getDatabase();
  db.run('DELETE FROM companies WHERE id = ?', [id]);
  saveDatabase();

  return true;
}
