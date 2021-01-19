import {Component, OnInit} from '@angular/core';
import {AuthServices} from "./services/auth.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  isAuth: boolean;

  constructor(private auth:AuthServices) {
    this.isAuth= this.auth.isAuthenticated();
  }

  ngOnInit() {
    this.auth.auth$.subscribe((isAuth)=> {
      this.isAuth = isAuth;
    })
  }
}
