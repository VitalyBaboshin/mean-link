import { Component, OnInit } from '@angular/core';
import {AuthServices} from "../../../services/auth.services";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
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
