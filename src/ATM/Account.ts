import { LinkedList } from "datastructures-js";
import { Bank } from "./Bank";
import { Transaction } from "./Transaction";
import { User } from "./User";

export class Account {
    private name: string;
    private balance: number;
    private uuid: string;
    private holder: User;
    private transactions: Array<Transaction>;
    constructor(name: string, holder: User, bank: Bank, initialDeposit: number) {
        this.name = name;
        this.balance = initialDeposit;
        this.uuid = bank.generateNewAccountId();
        this.holder = holder;
        this.transactions = new Array<Transaction>();
    }

    public getUUID(): string {
        return this.uuid;
    }

    public getSummaryLine(): string {
        let balance: number = this.balance;
        if (balance >= 0) return `Your ${this.name} Account ${this.uuid} has balance of INR ${balance.toFixed(2)}`;
        else return `Your ${this.name} Account ${this.uuid} has balance of INR ${balance.toFixed(2)}`;
    }

    public getBalance(): number {
        let balance: number = 0;
        this.transactions.forEach((transaction: Transaction) => {
            balance += transaction.getAmount();
        })
        return balance;
    }

    public printTransactionHistory(): void {
        console.log(`Transaction history for the account ${this.uuid} \n`);
        for (let i = this.transactions.length - 1; i >= 0; i--) {
            console.log(this.transactions[i].getSummaryForTheTransaction());
        }
        console.log();
    }

    public addTransaction(amount: number, note: string): void {
        let newTransaction: Transaction = new Transaction(amount, this);
        newTransaction.setNote(note);
        this.transactions.push(newTransaction);
    }

}