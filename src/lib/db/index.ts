export { initDatabase, saveDatabase, getDatabase, clearDatabase } from './database';

export {
  createContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from './contacts';

export {
  createCompany,
  getCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from './companies';

export { createDeal, getDeal, getAllDeals, updateDeal, deleteDeal } from './deals';

export { createTask, getTask, getAllTasks, updateTask, deleteTask } from './tasks';

export { createNote, getNote, getAllNotes, updateNote, deleteNote } from './notes';

export type { QueryOptions, QueryResult } from './types';
