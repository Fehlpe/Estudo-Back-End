import { v4 } from 'uuid'

export class User {
    id: number | string;
    name: string;
    cpf: string;
    email: string;
    age: number;
    transactions: Transaction[];
  
    constructor(name: string, cpf: string, email: string, age: number) {
      this.id = v4();
      this.name = name;
      this.cpf = cpf;
      this.email = email;
      this.age = age;
      this.transactions = [];
    }
  }
  
export class Transaction {
    id: number | string;
    title: string;
    value: number;
    type: string;
  
    constructor(title: string, value: number, type: string) {
      this.id = v4();
      this.title = title;
      this.value = value;
      this.type = type;
    }
  }
  