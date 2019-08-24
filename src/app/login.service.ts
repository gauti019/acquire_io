import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private config: Config = new Config;
  private uri: string = this.config.baseUrlLocal+'/users';

  constructor(private http: HttpClient) { }

  addTransaction(username: string, email: string, password: string): any {
    const obj = {
      username: username,
      email: email,
      password: password
    };
    return this.http.post(`${this.uri}/register`, obj);
  }

  checkUsername(x: string) {
    return this.http.get(`${this.uri}/validate/${x}`);
  }

  validateUser(username: string, email: string, password: string): any {
    const obj = {
      username: username,
      email: email,
      password: password
    };
    return this.http.post(`${this.uri}/login`, obj);
  }

}
