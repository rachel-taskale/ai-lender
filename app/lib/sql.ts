export const createAccountTable = `
  CREATE TABLE accounts (
    email TEXT PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export const createDocumentsTable = `
  CREATE TABLE user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES accounts(email) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT now(),
    extracted_text TEXT,
    transactions JSONB,
    claude_analysis JSONB
  );
`;

export const createCumulativeSummary = `
  CREATE TABLE user_cumulative_summary (
    user_id TEXT PRIMARY KEY REFERENCES accounts(email) ON DELETE CASCADE,
    total_income NUMERIC,
    total_spending NUMERIC,
    suspicious_flags TEXT[],
    approved_for_loan BOOLEAN,
    risk_score NUMERIC,
    last_updated TIMESTAMP DEFAULT now(),
    summary TEXT
  );
`;

// //  id SERIAL PRIMARY KEY,
// // email TEXT NOT NULL UNIQUE,
// // name TEXT,
// // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// // Insert a new account
// export const createAccount = `
//   INSERT INTO accounts (email, name, created_at)
//   VALUES ($1, $2)
//   RETURNING *;
// `;

// // Get a single account by ID
// export const getAccount = `
//   SELECT * FROM accounts
//   WHERE id = $1;
// `;

// // Insert a document for an account
// export const uploadDocument = `
//   INSERT INTO documents (account_id, filename, content)
//   VALUES ($1, $2, $3)
//   RETURNING *;
// `;

// // Get a single document by document ID
// export const getDocument = `
//   SELECT * FROM documents
//   WHERE id = $1;
// `;
