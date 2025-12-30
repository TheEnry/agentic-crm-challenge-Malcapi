import { useEffect, useState } from 'react';
import { Contact } from '@/crm/types/contact';
import { getAllContacts } from '@/lib/db';

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

  useEffect(() => {
    refreshContacts();
  }, []);

  return { contacts, loading, error, refreshContacts };
}
