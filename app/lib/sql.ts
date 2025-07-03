export const createAccountTable = `CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

export const createFilesTable = `
  CREATE TABLE IF NOT EXISTS files (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    content TEXT,  -- or BYTEA if storing binary data
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Insert a new account
export const createAccount = `
  INSERT INTO accounts (email, name)
  VALUES ($1, $2)
  RETURNING *;
`;

// Get a single account by ID
export const getAccount = `
  SELECT * FROM accounts
  WHERE id = $1;
`;

// Insert a file for an account
export const uploadFile = `
  INSERT INTO files (account_id, filename, content)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

// Get a single file by file ID
export const getFile = `
  SELECT * FROM files
  WHERE id = $1;
`;

// Get all files for a given account
export const getFiles = `
  SELECT * FROM files
  WHERE account_id = $1
  ORDER BY uploaded_at DESC;
`;
