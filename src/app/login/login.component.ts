import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginService } from '../login.service'
import { BaseApiService } from '../base-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public warningIncorrectPassword: string = "This is an incorrect password. Please try again";

  constructor(public router: Router,public loginService: LoginService, public baseApiService: BaseApiService) {
   }

  private returnedPassword: string;
  public showSpinner;
  transaction: any;
  resultBool: boolean;
  username: string;
  password: string;

  ngOnInit() {
  }

  login(): void {

    this.loginService.validateUser(this.username, '', this.password).subscribe( response => {
      if(response && response.authenticated){
        BaseApiService.user_name = this.username;
        BaseApiService.user_id = response.id;
        this.router.navigateByUrl('/posts');
        alert("You are successfully logged in")
      }
      else{
        alert(this.warningIncorrectPassword)
        this.router.navigateByUrl('/login');
      }
    });

  };

}
