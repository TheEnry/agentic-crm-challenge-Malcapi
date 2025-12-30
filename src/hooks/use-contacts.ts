import { useEffect, useState } from 'react';
import { Contact } from '@/crm/types/contact';
import { getAllContacts, createContact, updateContact, deleteContact } from '@/lib/db';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshContacts = () => {
    try {
      setLoading(true);
      const result = getAllContacts({
        orderBy: 'updatedAt',
        orderDirection: 'DESC',
      });
      setContacts(result.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load contacts'));
      console.error('Error loading contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const addContact = (contact: Contact) => {
    try {
      createContact(contact);
      refreshContacts();
      return true;
    } catch (err) {
      console.error('Error creating contact:', err);
      throw err;
    }
  };

  const modifyContact = (id: string, updates: Partial<Contact>) => {
    try {
      const result = updateContact(id, updates);
      if (result) {
        refreshContacts();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating contact:', err);
      throw err;
    }
  };

  const removeContact = (id: string) => {
    try {
      const result = deleteContact(id);
      if (result) {
        refreshContacts();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error deleting contact:', err);
      throw err;
    }
  };

  useEffect(() => {
    refreshContacts();
  }, []);

  return { contacts, loading, error, refreshContacts, addContact, modifyContact, removeContact };
}
