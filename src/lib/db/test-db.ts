import { Contact } from '@/crm/types/contact';
import { Company } from '@/crm/types/company';
import { Deal } from '@/crm/types/deal';
import { Task } from '@/crm/types/task';
import { Notes } from '@/crm/types/notes';
import {
  initDatabase,
  createContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
  createCompany,
  getCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
  createDeal,
  getDeal,
  getAllDeals,
  updateDeal,
  deleteDeal,
  createTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
  clearDatabase,
} from './index';

export async function testDatabase() {
  console.log('Starting database tests...');

  try {
    // Initialize database
    await initDatabase();
    console.log('✓ Database initialized');

    // Test Contacts
    const testContact: Contact = {
      id: 'test-contact-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createContact(testContact);
    console.log('✓ Contact created');

    const retrievedContact = getContact('test-contact-1');
    console.log('✓ Contact retrieved:', retrievedContact?.name);

    const allContacts = getAllContacts({ limit: 10 });
    console.log('✓ All contacts retrieved:', allContacts.total);

    updateContact('test-contact-1', { name: 'John Doe Updated' });
    console.log('✓ Contact updated');

    deleteContact('test-contact-1');
    console.log('✓ Contact deleted');

    // Test Companies
    const testCompany: Company = {
      id: 'test-company-1',
      name: 'Test Company',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createCompany(testCompany);
    console.log('✓ Company created');

    const retrievedCompany = getCompany('test-company-1');
    console.log('✓ Company retrieved:', retrievedCompany?.name);

    const allCompanies = getAllCompanies({ limit: 10 });
    console.log('✓ All companies retrieved:', allCompanies.total);

    updateCompany('test-company-1', { name: 'Test Company Updated' });
    console.log('✓ Company updated');

    deleteCompany('test-company-1');
    console.log('✓ Company deleted');

    // Test Deals
    const testDeal: Deal = {
      id: 'test-deal-1',
      title: 'Test Deal',
      content: 'This is a test deal',
      userName: 'admin',
      dueAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createDeal(testDeal);
    console.log('✓ Deal created');

    const retrievedDeal = getDeal('test-deal-1');
    console.log('✓ Deal retrieved:', retrievedDeal?.title);

    const allDeals = getAllDeals({ limit: 10 });
    console.log('✓ All deals retrieved:', allDeals.total);

    updateDeal('test-deal-1', { title: 'Test Deal Updated' });
    console.log('✓ Deal updated');

    deleteDeal('test-deal-1');
    console.log('✓ Deal deleted');

    // Test Tasks
    const testTask: Task = {
      id: 'test-task-1',
      title: 'Test Task',
      content: 'This is a test task',
      createdBy: 'admin',
      dueAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createTask(testTask);
    console.log('✓ Task created');

    const retrievedTask = getTask('test-task-1');
    console.log('✓ Task retrieved:', retrievedTask?.title);

    const allTasks = getAllTasks({ limit: 10 });
    console.log('✓ All tasks retrieved:', allTasks.total);

    updateTask('test-task-1', { title: 'Test Task Updated' });
    console.log('✓ Task updated');

    deleteTask('test-task-1');
    console.log('✓ Task deleted');

    // Test Notes
    const testNote: Notes = {
      id: 'test-note-1',
      title: 'Test Note',
      content: 'This is a test note',
      createdBy: 'admin',
      dueAt: new Date(),
      status: 'pending',
      assignedContactIds: [],
      companyIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createNote(testNote);
    console.log('✓ Note created');

    const retrievedNote = getNote('test-note-1');
    console.log('✓ Note retrieved:', retrievedNote?.title);

    const allNotes = getAllNotes({ limit: 10 });
    console.log('✓ All notes retrieved:', allNotes.total);

    updateNote('test-note-1', { title: 'Test Note Updated' });
    console.log('✓ Note updated');

    deleteNote('test-note-1');
    console.log('✓ Note deleted');

    console.log('✅ All database tests passed!');
    
    return true;
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return false;
  }
}

// Optional: Clear database for fresh start
export function resetDatabase() {
  clearDatabase();
  console.log('Database cleared');
}
