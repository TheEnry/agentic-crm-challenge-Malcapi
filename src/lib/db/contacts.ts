import { Contact } from '@/crm/types/contact';
import { getDatabase, saveDatabase } from './database';
import { QueryOptions, QueryResult } from './types';

function serializeContact(contact: Contact): Record<string, string | number | null> {
  return {
    id: contact.id,
    avatar: contact.avatar || null,
    initials: contact.initials || null,
    name: contact.name,
    email: contact.email || null,
    phone: contact.phone || null,
    position: contact.position || null,
    company: contact.company || null,
    address: contact.address || null,
    state: contact.state || null,
    city: contact.city || null,
    zip: contact.zip || null,
    country: contact.country || null,
    socialLinks: contact.socialLinks ? JSON.stringify(contact.socialLinks) : null,
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
    logo: contact.logo || null,
  };
}

function deserializeContact(row: Record<string, string | number>): Contact {
  return {
    id: row.id as string,
    avatar: (row.avatar as string) || '',
    initials: (row.initials as string) || undefined,
    name: row.name as string,
    email: (row.email as string) || undefined,
    phone: (row.phone as string) || undefined,
    position: (row.position as string) || undefined,
    company: (row.company as string) || undefined,
    address: (row.address as string) || undefined,
    state: (row.state as string) || undefined,
    city: (row.city as string) || undefined,
    zip: (row.zip as string) || undefined,
    country: (row.country as string) || undefined,
    socialLinks: row.socialLinks ? JSON.parse(row.socialLinks as string) : undefined,
    createdAt: new Date(row.createdAt as string),
    updatedAt: new Date(row.updatedAt as string),
    logo: (row.logo as string) || undefined,
  };
}

export function createContact(contact: Contact): Contact {
  const db = getDatabase();
  const data = serializeContact(contact);

  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data)
    .map(() => '?')
    .join(', ');
  const values = Object.values(data);

  db.run(`INSERT INTO contacts (${columns}) VALUES (${placeholders})`, values);
  saveDatabase();

  return contact;
}

export function getContact(id: string): Contact | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM contacts WHERE id = ?', [id]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0];
  const contact: Record<string, string | number> = {};
  row.columns.forEach((col, idx) => {
    contact[col] = row.values[0][idx] as string | number;
  });

  return deserializeContact(contact);
}

export function getAllContacts(options?: QueryOptions): QueryResult<Contact> {
  const db = getDatabase();
  const { limit, offset, orderBy = 'createdAt', orderDirection = 'DESC' } = options || {};

  let query = `SELECT * FROM contacts ORDER BY ${orderBy} ${orderDirection}`;
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
  const countResult = db.exec('SELECT COUNT(*) as total FROM contacts');

  const contacts: Contact[] = [];
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0];
    row.values.forEach((values) => {
      const contact: Record<string, string | number> = {};
      row.columns.forEach((col, idx) => {
        contact[col] = values[idx] as string | number;
      });
      contacts.push(deserializeContact(contact));
    });
  }

  const total = countResult.length > 0 ? (countResult[0].values[0][0] as number) : 0;

  return { data: contacts, total };
}

export function updateContact(id: string, updates: Partial<Contact>): Contact | null {
  const db = getDatabase();
  const existing = getContact(id);

  if (!existing) {
    return null;
  }

  const updated: Contact = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date(),
  };

  const data = serializeContact(updated);
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = [...Object.values(data), id];

  db.run(`UPDATE contacts SET ${setClause} WHERE id = ?`, values);
  saveDatabase();

  return updated;
}

export function deleteContact(id: string): boolean {
  const db = getDatabase();
  db.run('DELETE FROM contacts WHERE id = ?', [id]);
  saveDatabase();

  return true;
}
