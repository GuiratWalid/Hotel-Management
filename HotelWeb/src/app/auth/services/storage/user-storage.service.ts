import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  static saveToken(token: string): void{
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void{
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user = this.getUser();
    if (user == null)
      return '';
    else return user.id;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if (user == null)
      return '';
    return user.role;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken === null)
      return false;
    const role: string = this.getUserRole();
    return role == "ADMIN" 
  }

  static isCustomerLoggedIn(): boolean{
    if(this.getToken === null)
      return false;
    const role: string = this.getUserRole();
    return role == "CUSTOMER" 
  }

  static signOut(): void{
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }

}
