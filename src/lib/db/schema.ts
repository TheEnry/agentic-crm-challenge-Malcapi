export const createTablesSQL = `
  -- Contacts table
  CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    avatar TEXT,
    initials TEXT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    position TEXT,
    company TEXT,
    address TEXT,
    state TEXT,
    city TEXT,
    zip TEXT,
    country TEXT,
    socialLinks TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    logo TEXT
  );

  -- Companies table
  CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    logo TEXT,
    name TEXT NOT NULL,
    domain TEXT,
    email TEXT,
    phone TEXT,
    description TEXT,
    categoryIds TEXT,
    contactIds TEXT,
    address TEXT,
    state TEXT,
    city TEXT,
    zip TEXT,
    country TEXT,
    angelList TEXT,
    linkedin TEXT,
    connectionStrengthId TEXT,
    x TEXT,
    instagram TEXT,
    facebook TEXT,
    telegram TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    foundedAt TEXT,
    estimatedArrId TEXT,
    employeeRangeId TEXT,
    lastInteractionAt TEXT,
    lastContacted TEXT,
    teamId TEXT,
    badge TEXT
  );

  -- Deals table
  CREATE TABLE IF NOT EXISTS deals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    companyIds TEXT,
    contactIds TEXT,
    dealIds TEXT,
    userName TEXT NOT NULL,
    dueAt TEXT NOT NULL,
    completedAt TEXT,
    completedBy TEXT,
    assignedContactIds TEXT,
    status TEXT,
    priority TEXT,
    comments INTEGER,
    amount REAL,
    currency TEXT,
    paymentDate TEXT,
    paymentType TEXT,
    contractNumber TEXT,
    discount REAL,
    avatar TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  -- Tasks table
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    companyIds TEXT,
    contactIds TEXT,
    dealIds TEXT,
    createdBy TEXT NOT NULL,
    dueAt TEXT NOT NULL,
    completedAt TEXT,
    completedBy TEXT,
    assignedContactIds TEXT,
    status TEXT,
    priority TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  -- Notes table
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    dueAt TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    assignedContactIds TEXT NOT NULL,
    companyIds TEXT NOT NULL,
    dealIds TEXT,
    completedAt TEXT,
    completedBy TEXT,
    logo TEXT
  );
`;
