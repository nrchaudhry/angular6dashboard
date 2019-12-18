import { Component, OnInit } from '@angular/core';
import { setting } from "../../setting";
import { LoginService } from "../../login/login.service";
import { ThemeSettings } from "../../services/theme_setting.service";
import { OnFailService } from "../../services/on-fail.service";
declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private _LoginService: LoginService, private _theme_: ThemeSettings, private _onFail_: OnFailService) { }

  app_ID_THEME = this._LoginService.loaddetail().applicationuser_ID;

  settings = {
    sidemenu_POSITION: "left",
    sidemenu_STYLE: "compact",
    sidemenu_COLOR: "color-bright",
    submenu_STYLE: "inside",
    submenu_COLOR: "color-dark",
    topbar_COLOR: "color-transparent",
    theme_COLOR: "light",
  };

 
  ngOnInit() {
    this._theme_.appByID(this.app_ID_THEME).subscribe(res => {
      if (res.application_THEME) {
        const object = JSON.parse(res.application_THEME);
        this.settings = object;
      }
    });
  }

  changeMenuColor(color, settings, menu) {

    if (menu == "menu") {
      console.log(color);
      settings.sidemenu_COLOR = color;
      return;
    }

    if (menu == "submenu") {
      console.log(color);
      settings.submenu_COLOR = color;
      return;
    }

    if (menu == "topbar") {
      console.log(color);
      settings.topbar_COLOR = color;
      return;
    }


  }

  userdetail = this._LoginService.loaddetail();
  last_LOGIN = this._LoginService.loaddetail().last_LOGIN;
  HeaderName = this._LoginService.loaddetail().HeaderName;
  ProjectTitle = this._LoginService.loaddetail().ProjectTitle;
  surname = this._LoginService.loaddetail().surname;
  forenames = this._LoginService.loaddetail().forenames;
  appLogoPath = this._LoginService.loaddetail().applicationlogo_PATH;

  logout() {
    this._LoginService.logout();
  }

  themeSettingsModel() {
    $("#themesettings").modal("show");
  }

  UpdateTheme(settings) {
    JSON.stringify(settings);
    const object = settings;
    console.log('====================================');
    console.log(JSON.stringify(object));
    console.log('====================================');

    this._theme_.updateThemeApp(JSON.stringify(object), this.app_ID_THEME).subscribe(res => {
      if (res) {
        $("#themesettings").modal("hide");
        location.reload(true);
      }

    }, error => {
      this._onFail_.onFail(error);
    });
  }
}
