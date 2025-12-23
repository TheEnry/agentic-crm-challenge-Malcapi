import { Notes } from '@/crm/types/notes';
import { getDatabase, saveDatabase } from './database';
import { QueryOptions, QueryResult } from './types';

function serializeNote(note: Notes): Record<string, string | number | null> {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    createdBy: note.createdBy,
    dueAt: note.dueAt.toISOString(),
    status: note.status,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    assignedContactIds: JSON.stringify(note.assignedContactIds),
    companyIds: JSON.stringify(note.companyIds),
    dealIds: note.dealIds ? JSON.stringify(note.dealIds) : null,
    completedAt: note.completedAt ? note.completedAt.toISOString() : null,
    completedBy: note.completedBy || null,
    logo: note.logo || null,
  };
}

function deserializeNote(row: Record<string, string | number>): Notes {
  return {
    id: row.id as string,
    title: row.title as string,
    content: row.content as string,
    createdBy: row.createdBy as string,
    dueAt: new Date(row.dueAt as string),
    status: row.status as Notes['status'],
    createdAt: new Date(row.createdAt as string),
    updatedAt: new Date(row.updatedAt as string),
    assignedContactIds: JSON.parse(row.assignedContactIds as string),
    companyIds: JSON.parse(row.companyIds as string),
    dealIds: row.dealIds ? JSON.parse(row.dealIds as string) : undefined,
    completedAt: row.completedAt ? new Date(row.completedAt as string) : undefined,
    completedBy: (row.completedBy as string) || undefined,
    logo: (row.logo as string) || undefined,
  };
}

export function createNote(note: Notes): Notes {
  const db = getDatabase();
  const data = serializeNote(note);

  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data)
    .map(() => '?')
    .join(', ');
  const values = Object.values(data);

  db.run(`INSERT INTO notes (${columns}) VALUES (${placeholders})`, values);
  saveDatabase();

  return note;
}

export function getNote(id: string): Notes | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM notes WHERE id = ?', [id]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0];
  const note: Record<string, string | number> = {};
  row.columns.forEach((col, idx) => {
    note[col] = row.values[0][idx] as string | number;
  });

  return deserializeNote(note);
}

export function getAllNotes(options?: QueryOptions): QueryResult<Notes> {
  const db = getDatabase();
  const { limit, offset, orderBy = 'createdAt', orderDirection = 'DESC' } = options || {};

  let query = `SELECT * FROM notes ORDER BY ${orderBy} ${orderDirection}`;
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
  const countResult = db.exec('SELECT COUNT(*) as total FROM notes');

  const notes: Notes[] = [];
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0];
    row.values.forEach((values) => {
      const note: Record<string, string | number> = {};
      row.columns.forEach((col, idx) => {
        note[col] = values[idx] as string | number;
      });
      notes.push(deserializeNote(note));
    });
  }

  const total = countResult.length > 0 ? (countResult[0].values[0][0] as number) : 0;

  return { data: notes, total };
}

export function updateNote(id: string, updates: Partial<Notes>): Notes | null {
  const db = getDatabase();
  const existing = getNote(id);

  if (!existing) {
    return null;
  }

  const updated: Notes = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date(),
  };

  const data = serializeNote(updated);
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = [...Object.values(data), id];

  db.run(`UPDATE notes SET ${setClause} WHERE id = ?`, values);
  saveDatabase();

  return updated;
}

export function deleteNote(id: string): boolean {
  const db = getDatabase();
  db.run('DELETE FROM notes WHERE id = ?', [id]);
  saveDatabase();

  return true;
}
