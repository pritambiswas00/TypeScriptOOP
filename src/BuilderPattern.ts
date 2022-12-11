interface IUser {
    setEmail:Function;
    setPhoneNumber:Function;
    setAddress:Function;
}
export class Address {
      private zipcode:number|null;
      private city:string|null;
      constructor(zipcode:number, city:string){
          this.zipcode=zipcode;
          this.city=city;
      }
}

class User {
      public name:string;
      public email:string|null;
      public phonenumber:string|null;
      public address:Address|null;
      constructor(name:string){
         this.name=name;
         this.email=null;
         this.phonenumber=null;
         this.address=null;
      }
}


export class CreateUser implements IUser{
    private user:User;
    constructor(name:string){
       this.user=new User(name);
    }
    setEmail(email:string):CreateUser {
        this.user.email=email;
        return this;
    };
    setPhoneNumber(number:string): CreateUser{
         this.user.phonenumber=number;
         return this;
    };
    setAddress(address:Address): CreateUser{
       this.user.address=address;
       return this;
    };
    build():User{
        return this.user;
    }

}