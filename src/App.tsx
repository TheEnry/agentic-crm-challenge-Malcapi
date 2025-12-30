import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';
import { LoadingBarContainer } from 'react-top-loading-bar';
import { Toaster } from '@/components/ui/sonner';
import { ModulesProvider } from './providers/modules-provider';
import { initDatabase } from '@/lib/db';
import { ingestContacts } from '@/lib/db/ingest';

const { BASE_URL } = import.meta.env;

export function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await initDatabase();
        await ingestContacts();
        setDbInitialized(true);
        console.log('Database initialized and data ingested');
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setDbInitialized(true); // Still render the app even if DB fails
      }
    }

    init();
  }, []);

  if (!dbInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing database...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="vite-theme"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <LoadingBarContainer>
        <BrowserRouter basename={BASE_URL}>
          <Toaster />
          <ModulesProvider />
        </BrowserRouter>
      </LoadingBarContainer>
    </ThemeProvider>
  );
}
