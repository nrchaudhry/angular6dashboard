import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { map, catchError } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";
import { setting } from "../setting";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root"
})
export class LoginService {

  constructor(
    private http: Http,
    private _cookieService: CookieService,
    private _router: Router,
    private _toastr : ToastrService,
  ) { }

  

  authToken: any;
  user: any;
  userId: any;

  saveToken(token) {
    if (token) {
      localStorage.setItem("_application_name_access_token_", token);
      return true;
    }
    else {
      return false;
    }
  }

  saveDetail(user) {
    if (user) {
      localStorage.setItem("_application_name_user_detail_", JSON.stringify(user));
      return true;
    }
    else {
      return false;
    }
  }

  loadToken() {
    const token = localStorage.getItem("_application_name_access_token_");
    this.authToken = token;
    console.log(this.authToken);
  }

  loaddetail() {
    const getUser = localStorage.getItem("_application_name_user_detail_");
    this.user = JSON.parse(getUser);
    return this.user;
  }

  logout() {
    localStorage.removeItem("_application_name_user_detail_");
    localStorage.removeItem("_application_name_access_token_");
    window.location.assign(setting.LoginAppPath+"logout?application_ID="+setting.application_ID);
    return true;
  }

  logged() {
    const getUser = localStorage.getItem("_application_name_user_detail_");
    const _application_name_access_token_ = localStorage.getItem("_application_name_access_token_");
    if (getUser && _application_name_access_token_) {
      return true;
    } else {
      return false;
    }
  }
}
