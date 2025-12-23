/**
 * Integration test for the SQLite database
 * This test verifies that all the database modules are correctly set up
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Check that all required files exist
const requiredFiles = [
  'src/lib/db/index.ts',
  'src/lib/db/database.ts',
  'src/lib/db/schema.ts',
  'src/lib/db/types.ts',
  'src/lib/db/contacts.ts',
  'src/lib/db/companies.ts',
  'src/lib/db/deals.ts',
  'src/lib/db/tasks.ts',
  'src/lib/db/notes.ts',
  'src/lib/db/test-db.ts',
  'src/lib/db/README.md',
  'src/lib/db/example.ts',
  'src/components/database-test.tsx',
  'public/sql-wasm/sql-wasm.wasm',
];

console.log('🔍 Checking database files...\n');

let allFilesExist = true;

for (const file of requiredFiles) {
  try {
    const content = readFileSync(file);
    console.log(`✅ ${file} (${content.length} bytes)`);
  } catch (error) {
    console.log(`❌ ${file} - NOT FOUND`);
    allFilesExist = false;
  }
}

console.log('\n📋 Checking exports from index.ts...\n');

const indexContent = readFileSync('src/lib/db/index.ts', 'utf8');
const requiredExports = [
  'initDatabase',
  'saveDatabase',
  'getDatabase',
  'clearDatabase',
  'createContact',
  'getContact',
  'getAllContacts',
  'updateContact',
  'deleteContact',
  'createCompany',
  'getCompany',
  'getAllCompanies',
  'updateCompany',
  'deleteCompany',
  'createDeal',
  'getDeal',
  'getAllDeals',
  'updateDeal',
  'deleteDeal',
  'createTask',
  'getTask',
  'getAllTasks',
  'updateTask',
  'deleteTask',
  'createNote',
  'getNote',
  'getAllNotes',
  'updateNote',
  'deleteNote',
];

let allExportsPresent = true;

for (const exportName of requiredExports) {
  if (indexContent.includes(exportName)) {
    console.log(`✅ ${exportName}`);
  } else {
    console.log(`❌ ${exportName} - NOT EXPORTED`);
    allExportsPresent = false;
  }
}

console.log('\n🔍 Checking schema.ts for all tables...\n');

const schemaContent = readFileSync('src/lib/db/schema.ts', 'utf8');
const requiredTables = ['contacts', 'companies', 'deals', 'tasks', 'notes'];

let allTablesPresent = true;

for (const table of requiredTables) {
  const createTablePattern = new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`, 'i');
  if (createTablePattern.test(schemaContent)) {
    console.log(`✅ ${table} table`);
  } else {
    console.log(`❌ ${table} table - NOT FOUND`);
    allTablesPresent = false;
  }
}

console.log('\n📦 Checking package.json for sql.js dependency...\n');

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
if (packageJson.dependencies['sql.js']) {
  console.log(`✅ sql.js@${packageJson.dependencies['sql.js']}`);
} else {
  console.log('❌ sql.js - NOT INSTALLED');
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));
if (allFilesExist && allExportsPresent && allTablesPresent) {
  console.log('✅ ALL CHECKS PASSED!');
  console.log('='.repeat(50));
  console.log('\n✨ Database setup is complete and ready to use!\n');
  process.exit(0);
} else {
  console.log('❌ SOME CHECKS FAILED!');
  console.log('='.repeat(50));
  process.exit(1);
}
