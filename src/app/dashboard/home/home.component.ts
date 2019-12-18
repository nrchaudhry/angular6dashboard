import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { DatePipe } from '@angular/common';
import { LoginService } from "../../login/login.service";
import { HomeService } from "./home.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private loginServ: LoginService,
    private HomeServ: HomeService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
  }
}
