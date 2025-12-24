import { Task } from '@/crm/types/task';
import { getDatabase, saveDatabase } from './database';
import { QueryOptions, QueryResult } from './types';

function serializeTask(task: Task): Record<string, string | number | null> {
  return {
    id: task.id,
    title: task.title,
    content: task.content,
    companyIds: task.companyIds ? JSON.stringify(task.companyIds) : null,
    contactIds: task.contactIds ? JSON.stringify(task.contactIds) : null,
    dealIds: task.dealIds ? JSON.stringify(task.dealIds) : null,
    createdBy: task.createdBy,
    dueAt: task.dueAt.toISOString(),
    completedAt: task.completedAt ? task.completedAt.toISOString() : null,
    completedBy: task.completedBy || null,
    assignedContactIds: task.assignedContactIds ? JSON.stringify(task.assignedContactIds) : null,
    status: task.status || null,
    priority: task.priority || null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}

function deserializeTask(row: Record<string, string | number>): Task {
  return {
    id: row.id as string,
    title: row.title as string,
    content: row.content as string,
    companyIds: row.companyIds ? JSON.parse(row.companyIds as string) : undefined,
    contactIds: row.contactIds ? JSON.parse(row.contactIds as string) : undefined,
    dealIds: row.dealIds ? JSON.parse(row.dealIds as string) : undefined,
    createdBy: row.createdBy as string,
    dueAt: new Date(row.dueAt as string),
    completedAt: row.completedAt ? new Date(row.completedAt as string) : undefined,
    completedBy: (row.completedBy as string) || undefined,
    assignedContactIds: row.assignedContactIds ? JSON.parse(row.assignedContactIds as string) : undefined,
    status: (row.status as Task['status']) || undefined,
    priority: (row.priority as Task['priority']) || undefined,
    createdAt: new Date(row.createdAt as string),
    updatedAt: new Date(row.updatedAt as string),
  };
}

export function createTask(task: Task): Task {
  const db = getDatabase();
  const data = serializeTask(task);

  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data)
    .map(() => '?')
    .join(', ');
  const values = Object.values(data);

  db.run(`INSERT INTO tasks (${columns}) VALUES (${placeholders})`, values);
  saveDatabase();

  return task;
}

export function getTask(id: string): Task | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM tasks WHERE id = ?', [id]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0];
  const rowData: Record<string, string | number> = {};
  row.columns.forEach((col, idx) => {
    rowData[col] = row.values[0][idx] as string | number;
  });

  return deserializeTask(rowData);
}

export function getAllTasks(options?: QueryOptions): QueryResult<Task> {
  const db = getDatabase();
  const { limit, offset, orderBy = 'createdAt', orderDirection = 'DESC' } = options || {};

  let query = `SELECT * FROM tasks ORDER BY ${orderBy} ${orderDirection}`;
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
  const countResult = db.exec('SELECT COUNT(*) as total FROM tasks');

  const tasks: Task[] = [];
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0];
    row.values.forEach((values) => {
      const rowData: Record<string, string | number> = {};
      row.columns.forEach((col, idx) => {
        rowData[col] = values[idx] as string | number;
      });
      tasks.push(deserializeTask(rowData));
    });
  }

  const total = countResult.length > 0 ? (countResult[0].values[0][0] as number) : 0;

  return { data: tasks, total };
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const db = getDatabase();
  const existing = getTask(id);

  if (!existing) {
    return null;
  }

  const updated: Task = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date(),
  };

  const data = serializeTask(updated);
  const setClause = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = [...Object.values(data), id];

  db.run(`UPDATE tasks SET ${setClause} WHERE id = ?`, values);
  saveDatabase();

  return updated;
}

export function deleteTask(id: string): boolean {
  const db = getDatabase();
  db.run('DELETE FROM tasks WHERE id = ?', [id]);
  saveDatabase();

  return true;
}
