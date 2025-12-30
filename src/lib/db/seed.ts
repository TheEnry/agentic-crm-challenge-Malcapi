import { mockContacts } from '@/crm/mock/contacts';
import { createContact } from './contacts';
import { getAllContacts } from './contacts';

export async function seedContacts(): Promise<void> {
  // Check if contacts already exist
  const { total } = getAllContacts();
  
  if (total > 0) {
    console.log('Database already has contacts, skipping seed');
    return;
  }

  // Import mock contacts into database
  console.log('Seeding database with mock contacts...');
  mockContacts.forEach(contact => {
    createContact(contact);
  });
  
  console.log(`Seeded ${mockContacts.length} contacts successfully`);
}
