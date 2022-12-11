import { Account } from "./Account";

export class Transaction {
    private amount: number;
    private timestamp: Date;
    private note: string;
    private relatedAccount: Account;
    constructor(amount: number, relatedAccount: Account) {
        this.amount = amount;
        this.relatedAccount = relatedAccount;
        this.timestamp = new Date();
    }
    public setNote(note: string): void {
        this.note = note;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getSummaryForTheTransaction(): string {
        if (this.amount >= 0) {
            return `\n Transaction amount: INR ${this.amount} : Date : ${this.timestamp}, \t Note: ${this.note}`;
        } else {
            return `\n Transaction amount: INR ${this.amount} : Date : ${this.timestamp}, \t Note: ${this.note}`;
        }
    }
}