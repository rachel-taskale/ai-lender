export const createUsersTable = `
  CREATE TABLE users (
    email TEXT PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
export const createUserDocumentsTable = `
  CREATE TABLE user_documents (
  uuid TEXT PRIMARY KEY,
  user_id TEXT  REFERENCES users(email) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  extracted_text TEXT,
  total_income NUMERIC(12, 2),
  total_spending NUMERIC(12, 2),
  transactions JSONB,          -- stores array of ExtractedTransactions
  suspicious_flags TEXT[],     -- stores string array
  summary TEXT
);
`;
export const createUserCumulativeSummaryTable = `
  CREATE TABLE user_cumulative_summary (
    user_id TEXT PRIMARY KEY REFERENCES users(email) ON DELETE CASCADE,
    total_income NUMERIC,
    total_spending NUMERIC,
    suspicious_flags TEXT[],
    approved_for_loan BOOLEAN,
    risk_score NUMERIC,
    last_updated TIMESTAMP DEFAULT now(),
    summary TEXT
  );
`;

export const insertUserDocument = `INSERT INTO user_documents (
uuid,
  user_id,
  filename,
  uploaded_at,
  extracted_text,
  total_income,
  total_spending,
  transactions,
  suspicious_flags,
  summary
) VALUES (
 $1, -- uuid
  $2,  -- user_id (email)
  $3,  -- filename
  $4,  -- uploaded_at (new Date())
  $5,  -- extracted_text (full text)
  $6,  -- total_income
  $7,  -- total_spending
  $8,  -- transactions (as JSON object)
  $9,  -- suspicious_flags (as string[])
  $10   -- summary
);`;

export const insertUser = `
  INSERT INTO users (
    email,
    name,
    created_at
  ) VALUES (
    $1,
    $2,
    $3
  )
  ON CONFLICT (email) DO NOTHING;
`;

export const getUser = `
  SELECT * FROM users WHERE email = $1;
`;
export const getUsers = `
  SELECT * FROM users;
`;
// Get a single document by document ID
export const getDocuments = `
  SELECT * FROM user_documents
  WHERE user_id = $1;
`;

export const getAllDocuments = `
  SELECT * FROM user_documents;
`;
export const dbTableInfo = `
SELECT EXISTS (
  SELECT 1
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name = $1
);`;

export const getAllDocumentAnalyses = `
  SELECT document_analysis::json
  FROM user_documents
  WHERE user_id = $1;`;
