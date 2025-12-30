import { mockContacts } from '@/crm/mock/contacts';
import { createContact } from './contacts';
import { getAllContacts } from './contacts';

export async function ingestContacts(): Promise<void> {
  // Check if contacts already exist
  const { total } = getAllContacts();
  
  if (total > 0) {
    console.log('Database already has contacts, skipping data ingestion');
    return;
  }

  // Ingest mock contacts into database
  console.log('Ingesting mock contacts data...');
  mockContacts.forEach(contact => {
    createContact(contact);
  });
  
  console.log(`Ingested ${mockContacts.length} contacts successfully`);
}
