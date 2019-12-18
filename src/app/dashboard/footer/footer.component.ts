import { Component, OnInit } from '@angular/core';
import { setting } from "../../setting";
import { LoginService } from "../../login/login.service";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  constructor(private _LoginService: LoginService) {}

  CompanyLink = this._LoginService.loaddetail().CompanyLink;
  CompanyName = this._LoginService.loaddetail().CompanyName;
  CopyRights = this._LoginService.loaddetail().CopyRights;
  appLogoPath = this._LoginService.loaddetail().applicationlogo_PATH;

  ngOnInit() {}
}
