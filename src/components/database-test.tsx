import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { testDatabase, resetDatabase } from '@/lib/db/test-db';

export function DatabaseTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const originalLog = console.log;
    const logs: string[] = [];

    console.log = (...args: unknown[]) => {
      const message = args.join(' ');
      logs.push(message);
      setTestResults([...logs]);
      originalLog(...args);
    };

    try {
      await testDatabase();
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const clearDb = () => {
    resetDatabase();
    setTestResults(['Database cleared successfully']);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>SQLite Database Test</CardTitle>
        <CardDescription>
          Test the browser-based SQLite database with CRUD operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={runTests} disabled={isRunning}>
            {isRunning ? 'Running Tests...' : 'Run Database Tests'}
          </Button>
          <Button variant="outline" onClick={clearDb}>
            Clear Database
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="rounded-md bg-slate-950 p-4 font-mono text-sm text-white">
            {testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
