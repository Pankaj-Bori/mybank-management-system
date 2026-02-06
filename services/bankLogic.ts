
import { AccountData, Transaction, TransactionType } from '../types';

/**
 * Representing an Individual Bank Account (OOP: Encapsulation)
 */
export class BankAccount {
  private data: AccountData;

  constructor(data: AccountData) {
    this.data = data;
  }

  public getDetails(): AccountData {
    // Return a copy to prevent direct mutation from outside
    return { ...this.data, transactions: [...this.data.transactions] };
  }

  public getBalance(): number {
    return this.data.balance;
  }

  public deposit(amount: number, description: string = 'Deposit'): boolean {
    if (amount <= 0) return false;
    
    this.data.balance += amount;
    this.addTransaction(TransactionType.DEPOSIT, amount, description);
    return true;
  }

  public withdraw(amount: number, description: string = 'Withdrawal'): boolean {
    if (amount <= 0 || amount > this.data.balance) return false;
    
    this.data.balance -= amount;
    this.addTransaction(TransactionType.WITHDRAWAL, amount, description);
    return true;
  }

  public receiveTransfer(amount: number, fromName: string): void {
    this.data.balance += amount;
    this.addTransaction(TransactionType.DEPOSIT, amount, `Transfer from ${fromName}`);
  }

  private addTransaction(type: TransactionType, amount: number, description: string) {
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      type,
      amount,
      description,
      timestamp: new Date(),
      balanceAfter: this.data.balance
    };
    this.data.transactions = [transaction, ...this.data.transactions];
  }
}

/**
 * Bank Management System (OOP: Abstraction & Data Structures)
 * Uses a Map as a Hash Map for O(1) account lookups.
 */
export class BankSystem {
  private accounts: Map<string, BankAccount>;

  constructor() {
    this.accounts = new Map<string, BankAccount>();
    // Default system accounts
    this.createAccount('1234567890', 'Demo User', 5000, 'mybank@123', 'SAVINGS');
    this.createAccount('999999', 'Central Reserve', 1000000, 'admin', 'CHECKING');
  }

  public createAccount(
    id: string, 
    ownerName: string, 
    initialBalance: number, 
    pin: string, 
    accountType: 'SAVINGS' | 'CHECKING'
  ): BankAccount | null {
    if (this.accounts.has(id)) return null;

    const newAccountData: AccountData = {
      id,
      ownerName,
      balance: initialBalance,
      pin,
      accountType,
      transactions: [],
      createdAt: new Date()
    };

    const account = new BankAccount(newAccountData);
    this.accounts.set(id, account);
    return account;
  }

  public getAccount(id: string): BankAccount | undefined {
    return this.accounts.get(id);
  }

  public transfer(fromId: string, toId: string, amount: number, description: string): boolean {
    const sender = this.getAccount(fromId);
    const receiver = this.getAccount(toId);

    if (!sender || !receiver || fromId === toId) return false;
    if (amount <= 0 || sender.getBalance() < amount) return false;

    const senderName = sender.getDetails().ownerName;
    const receiverName = receiver.getDetails().ownerName;

    // Execute transfer
    const success = sender.withdraw(amount, `Transfer to ${receiverName}: ${description}`);
    if (success) {
      receiver.receiveTransfer(amount, senderName);
      return true;
    }
    return false;
  }

  public getAllAccountIds(): string[] {
    return Array.from(this.accounts.keys());
  }
}

// Singleton instance for the app
export const globalBank = new BankSystem();
