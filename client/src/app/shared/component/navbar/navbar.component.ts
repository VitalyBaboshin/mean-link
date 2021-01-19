import { Component } from '@angular/core';
import {AuthServices} from "../../../services/auth.services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {

  constructor(private auth: AuthServices) { }

  logOut() {
    this.auth.logout();
  }
}
