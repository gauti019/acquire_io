import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../models/user-register.model';
import { Router } from '@angular/router';
import { MaterialModule } from '../modules/material-ui/material-ui.module';
import { LoginService } from '../login.service';
import { BaseApiService } from '../base-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {

  public flagIsUnique: boolean = true;
  public flagUsernameAvailable: boolean = false;
  public strength: any;
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  public baseColor = '#FFF';

  public userRegister: UserRegister = {
    fname: "",
    lname: "",
    uname: "",
    email: "",
    password1: "",
    password2: ""
  };

  public account = {
    password: <string>null
  }

  constructor(private router: Router, private loginService: LoginService, public baseApiService: BaseApiService ) { }

  ngOnInit() { }

  strengthChanged(strength: number) {
    this.strength = strength;
  }

  checkAvailablity(): void {

    // depending on the value of this flag, the register button will be enabled/disabled.
    this.flagUsernameAvailable = true;

      this.loginService.checkUsername(this.userRegister.uname).subscribe( (res: any) => {
        // username is unique if there is no transaction record in DB(i.e. null) for that username.
        if (res.transaction == null) {
          alert('Fortunately, this username is available, you are good to go.')
          this.flagUsernameAvailable = true;
        }
        else {
          this.flagUsernameAvailable = false;
          alert('Please try something unique, this one is already taken')
        }

      });
  }

  registerFunction(): void {

    // to save data into mongoDB.
    this.loginService.addTransaction(this.userRegister.uname, this.userRegister.email, this.userRegister.password1).subscribe(res=>{
      if(!res) {
        alert(' Registration was un-successfull. Please try again.')
      } else{
        BaseApiService.user_name = this.userRegister.uname;
        this.router.navigateByUrl('/posts');
        // localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('token', (res.token?res.token:null) );
        alert(' Registration is successfull.')
      }
    })


  }


}

