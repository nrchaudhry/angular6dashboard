import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { LoginService } from "../login/login.service";
import { ActivatedRoute } from "@angular/router";
import { setting } from "../setting";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginservice: LoginService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    if (this.loginservice.logged() == true) {
      setTimeout(() => this.toastr.success("Sucessfully loged in!"));
      this.offSpinner();
      this.router.navigate(["/dashboard/home"]);
      console.log("wellcome to UM");
      return;
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log(params);
        if (params.access_token && params.application_ID && params.expires_in && params.last_LOGIN && params.user_NAME) {
          let statusdetail = this.loginservice.saveDetail(params);
          let statusToken = this.loginservice.saveToken(params.access_token);
          if (statusdetail && statusToken) {
            if (this.loginservice.logged()) {
              setTimeout(() =>
                this.toastr.success("Sucessfully loged in!")
              );
              this.offSpinner();
              this.router.navigate(["/dashboard/home"]);
              return;
            } else {
              console.log("go to login ");
              this.offSpinner();
              this.loginservice.logout();
              return false;
            }
          }
        } else {
          if (this.loginservice.logged() == false) {
            console.log('====================================');
            console.log("else part");
            console.log('====================================');
            location.assign(setting.LoginAppPath + "login?application_ID=" + setting.application_ID);
            return;
          }
          else {
            this.offSpinner();
            this.loginservice.logout();
            return;
          }
        }
      });
    }
  }

  offSpinner() {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
}