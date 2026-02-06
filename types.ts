// types.ts
// Centralized data models used across the banking application
// Keeping types here helps maintain consistency between UI and logic

// Types of transactions supported in the system
export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER'
}

// Represents a single bank transaction
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  timestamp: Date;           // When the transaction occurred
  description: string;       // User-readable message
  balanceAfter: number;      // Balance after this transaction
}

// Represents a user's bank account data
export interface AccountData {
  id: string;
  ownerName: string;
  balance: number;
  pin: string;               // Stored as plain text for demo purposes only
  accountType: 'SAVINGS' | 'CHECKING';
  transactions: Transaction[];
  createdAt: Date;
}
