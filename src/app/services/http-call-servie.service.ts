import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { setting } from "../setting";
import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class HttpCallServieService {


  constructor(
    private http: Http,
    private loginService: LoginService
  ) { }

  BaseUrl: any = this.loginService.loaddetail().applicationservice_PATH;

  api(postData){
    return this.http.post(
      this.BaseUrl + "service", postData
    ).pipe(map(res => res.json()));  
  }

}

