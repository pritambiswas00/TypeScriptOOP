import { Account } from "./Account";
import { User } from "./User";
import { randomUUID } from "crypto"

export class Bank {
     private name: string;
     private accounts: Array<Account>;
     private users: Array<User>;

     constructor(name: string) {
          this.name = name;
          this.accounts = new Array<Account>();
          this.users = new Array<User>();
     }

     public generateNewAccountId(): string {
          return randomUUID().toString();
     }

     public generateNewUserId(): string {
          return randomUUID().toString();
     }

     public createNewUser(firstName: string, lastName: string, pinCode: string, initialDeposit: number, typeOfAccount: string): User {
          let newUser: User = new User(firstName, lastName, pinCode, this);
          this.users.push(newUser);
          let account: Account = new Account(typeOfAccount, newUser, this, initialDeposit);
          this.accounts.push(account);
          return newUser;
     }

     public getNameOfTheBank(): string {
          return this.name;
     }

     public login(userId: string, pinCode: string): User {
          this.users.forEach((user: User) => {
               if (user.getUUID().localeCompare(userId) === 0 && user.checkPinNumber(pinCode)) {
                    return user;
               }
          })
          return null;
     }

     public addAccount(account: Account): void {
          this.accounts.push(account);
     }
}