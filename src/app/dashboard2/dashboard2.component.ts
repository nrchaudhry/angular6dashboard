import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login/login.service";

@Component({
  selector: "app-dashboard2",
  templateUrl: "./dashboard2.component.html",
  styleUrls: [
    "./dashboard2.component.css"
  ]
})
export class Dashboard2Component implements OnInit {
  constructor(private _LoginService: LoginService) {}

  CompanyLink = this._LoginService.loaddetail().CompanyLink;
  CompanyName = this._LoginService.loaddetail().CompanyName;
  CopyRights = this._LoginService.loaddetail().CopyRights;
  appLogoPath = this._LoginService.loaddetail().applicationlogo_PATH;

  ngOnInit() {}
}
