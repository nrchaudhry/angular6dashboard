import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { LoginService } from "../login/login.service";
import { SidebarService } from "../dashboard/sidebar.service";
import { OnFailService } from "../services/on-fail.service";
import { ThemeSettings } from "../services/theme_setting.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private _theme_ : ThemeSettings,
    private _toaster: ToastrService,
    public loginservice: LoginService,
    public SidebarService: SidebarService,
    private _OnFail_: OnFailService
  ) {}

  app_ID_THEME = this.loginservice.loaddetail().applicationuser_ID;
  appLogoPath = this.loginservice.loaddetail().applicationlogo_PATH;
  HeaderName = this.loginservice.loaddetail().HeaderName;
  forenames = this.loginservice.loaddetail().forenames;
  surname = this.loginservice.loaddetail().surname;
  temp = [];
  menu = [];
  AllMenus = [];

  
  settings = {
    sidemenu_POSITION: null,
    sidemenu_STYLE: null,
    sidemenu_COLOR: null,
    submenu_STYLE: null,
    submenu_COLOR: null,
    topbar_COLOR: null,
    theme_COLOR: null,
  };

  
  loadIT:boolean = false;  
  ngOnInit() {
    this.sideBar();
    this._theme_.appByID(this.app_ID_THEME).subscribe(res => {
      if(res.application_THEME){
        this.settings = JSON.parse(res.application_THEME);
        if(this.settings)
        {
          this.loadIT = true;
        }
      }else
      {
        this.settings = {
          sidemenu_POSITION: "left",
          sidemenu_STYLE: "compact",
          sidemenu_COLOR: "color-bright",
          submenu_STYLE: "inside",
          submenu_COLOR: "color-dark",
          topbar_COLOR: "color-transparent",
          theme_COLOR: "light",
        };
        if (this.settings) {
          this.loadIT = true;
        }
      }
    })
  }

  sideBar() {
    this.SidebarService.userprivileges().subscribe(
      res => {
        this.AllMenus = res;
        var tempPri = [],
          flags = [];
        for (var m = 0; m < res.length; m++) {
          if (flags[res[m].pcategory_ID.pcategory_ID]) continue;
          flags[res[m].pcategory_ID.pcategory_ID] = true;
          this.temp.push(res[m].pcategory_ID);
        }
        for (var c = 0; c < this.temp.length; c++) {
          for (var p = 0; p < res.length; p++) {
            if (
              res[p].pcategory_ID.pcategory_NAME ==
                this.temp[c].pcategory_NAME &&
              res[p].ismenuprivilege == "Y"
            ) {
              tempPri.push({
                name: res[p].privilege_NAME,
                link: res[p].privilege_STATE
              });
            }
            if (p == res.length - 1) {
              if (tempPri.length > 0) {
                this.menu[c] = {
                  cat: this.temp[c].pcategory_NAME,
                  iconname: this.temp[c].pcategory_ICON,
                  pri: tempPri
                };
                tempPri = [];
              }
            }
          }
        }
      },
      err => {
        this._OnFail_.onFail(err);
      }
    );
  }
}
