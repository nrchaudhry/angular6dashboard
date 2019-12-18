import { Injectable } from '@angular/core';
import { LoginService } from "../login/login.service";
import { Router, CanActivate } from "@angular/router";
import { setting } from "../setting";
@Injectable()
export class AuthGuardService {

  constructor(
    private loginService: LoginService,
    private router : Router
  ) { }


  canActivate() {
    if (this.loginService.logged()) {
      console.log("Logged auth guard!");
      return true;
    } else {
      location.replace(setting.LoginAppPath+"login?application_ID="+setting.application_ID);
      return false;
    }
  }

}
