import { LinkedList } from "datastructures-js";
import { Account } from "./Account";
import { Bank } from "./Bank";
import { genSalt, hashSync, compareSync } from "bcrypt";


export class User {
    private firstName: string;
    private lastName: string;
    private uuid: string;
    private pinNumber: string;
    private accounts: Array<Account>;
    constructor(firstName: string, lastName: string, pinNumber: string, bank: Bank) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.uuid = bank.generateNewUserId();
        try {
            genSalt(10, (error, salt) => {
                this.pinNumber = hashSync(pinNumber, salt);
            });
        } catch (error) {
            throw new Error(error);
        }
        this.accounts = new Array<Account>();
        console.log(`User with ${this.firstName} : ${this.lastName} created with uniqueId ${this.uuid}`);
    }

    public getUUID(): string {
        return this.uuid;
    }

    public checkPinNumber(pinCode: string): boolean {
        try {
            return compareSync(pinCode, this.pinNumber);
        } catch (error) {
            console.log("Cannnot verfifed credentials, Please provide a valid credentials.");
            process.exit(1);
        }
    }

    public printUserSummary(): void {
        console.log(`\n\n ${this.firstName}'s account summary: \n`);
        for (let i = 0; i < this.accounts.length; i++) {
            console.log(`\n ${i + 1} ) Account : ${this.accounts[i].getSummaryLine()}`);
        }
    }

    public numberOfAccount(): number {
        return this.accounts.length;
    }

    public printTransactionHistory(accountNumber: number): void {
        this.accounts[accountNumber].printTransactionHistory();
    }

    public getLeftAccountBalance(accountNumber: number): number {
        return this.accounts[accountNumber].getBalance();
    }

    public processTransaction(accountNumber: number, amount: number, note: string): void {
        this.accounts[accountNumber].addTransaction(amount, note);
    }

    public getAccountUUID(accountNumber: number): string {
        return this.accounts[accountNumber].getUUID();
    }

    public addAccount(account: Account): void {
        this.accounts.push(account);
    }
}