/**
 * Example usage of the SQLite database
 * 
 * This file demonstrates how to use the database in your components
 */

import {
  initDatabase,
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from './index';
import { Contact } from '@/crm/types/contact';

/**
 * Initialize the database when your app starts
 * Call this in your main App component or provider
 */
export async function initializeApp() {
  try {
    await initDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

/**
 * Example: Create a new contact
 */
export function exampleCreateContact() {
  const newContact: Contact = {
    id: crypto.randomUUID(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234-567-8900',
    company: 'Acme Corp',
    avatar: '/media/avatars/default.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const created = createContact(newContact);
  console.log('Created contact:', created);
  return created;
}

/**
 * Example: Fetch all contacts with pagination
 */
export function exampleGetContacts() {
  const result = getAllContacts({
    limit: 10,
    offset: 0,
    orderBy: 'name',
    orderDirection: 'ASC',
  });

  console.log(`Found ${result.total} contacts`);
  console.log('First page:', result.data);
  return result;
}

/**
 * Example: Update a contact
 */
export function exampleUpdateContact(contactId: string) {
  const updated = updateContact(contactId, {
    email: 'updated@example.com',
    phone: '+1 999-999-9999',
  });

  if (updated) {
    console.log('Contact updated:', updated);
  } else {
    console.log('Contact not found');
  }
  return updated;
}

/**
 * Example: Delete a contact
 */
export function exampleDeleteContact(contactId: string) {
  const deleted = deleteContact(contactId);
  console.log('Contact deleted:', deleted);
  return deleted;
}

/**
 * Example: Use in a React component
 */
export const contactsExample = `
import { useEffect, useState } from 'react';
import { initDatabase, getAllContacts } from '@/lib/db';
import { Contact } from '@/crm/types/contact';

export function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContacts() {
      try {
        await initDatabase();
        const result = getAllContacts({ limit: 20 });
        setContacts(result.data);
      } catch (error) {
        console.error('Failed to load contacts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadContacts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Contacts ({contacts.length})</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.name} - {contact.email}</li>
        ))}
      </ul>
    </div>
  );
}
`;
