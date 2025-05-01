// This is a placeholder file since we're using JSON files for data storage in the MVP
// When we're ready to switch to a real database, this file will be updated

// Export dummy objects to prevent import errors
export const pool = {};
export const db = {
  query: {},
  insert: () => ({ values: () => ({ returning: () => Promise.resolve([]) }) }),
};

console.log("Using JSON files for data storage (MVP mode)");