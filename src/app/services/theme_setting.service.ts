import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { setting } from "../setting";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../login/login.service";

@Injectable({
    providedIn: "root"
})
export class ThemeSettings {
    constructor(
        private http: Http,
        private _cookieService: CookieService,
        private _router: Router,
        private _toastr: ToastrService,
        private loginService: LoginService
    ) { }

    BaseUrl: any = this.loginService.loaddetail().oauthservice_PATH;
    USERLOGINTOKEN: any = this.loginService.loaddetail().basic_Token_;

    appByID(id) {
        return this.http
            .get(
                this.BaseUrl +
                "applicationuser/"+id,
                {
                    headers: new Headers({
                        "Content-Type": "application/json",
                        grant_type: "password",
                        authorization: "bearer " + this.USERLOGINTOKEN
                    })
                }
            )
            .pipe(map(res => res.json()));
    }

    updateThemeApp(object , id){
        return this.http
            .put(
                this.BaseUrl +
                "applicationuser/" + id,
                { application_THEME : object }, 
                {
                    headers: new Headers({
                        "Content-Type": "application/json",
                        grant_type: "password",
                        authorization: "bearer " + this.USERLOGINTOKEN
                    })
                }
            )
            .pipe(map(res => res.json()));
    }
}
