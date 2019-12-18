import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: Http) { }
  
}
