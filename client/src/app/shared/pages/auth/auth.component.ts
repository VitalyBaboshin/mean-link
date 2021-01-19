import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

import * as M from 'materialize-css';
import {AuthServices} from "../../../services/auth.services";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loginSub: Subscription;
  regSub: Subscription;
  constructor(private auth:AuthServices,
              private router: Router,
              private route: ActivatedRoute) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['create'])
    }
  }

  ngOnInit(): void {
    M.updateTextFields();

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6), Validators.maxLength(20)
      ])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //теперь можно зайти в систему испоьзуя свои данные
      } else if (params['accessDenied']){
        M.toast({html: 'Авторизуйтесь'});
      }
    })

    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData !== null) {
      this.auth.setToken(userData.token);
    }
  }
  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
    if (this.regSub) {
      this.regSub.unsubscribe();
    }
  }
  onLogin() {
    this.form.disable();
    this.loginSub = this.auth.login(this.form.value).subscribe(
      () =>this.router.navigate(['/create']),
      error => {
        M.toast({html: error.error.message});
        this.form.enable();
      }
    )
  }
  onRegister() {
    this.form.disable();
    this.regSub = this.auth.register(this.form.value).subscribe(
      (e: any) => {
        M.toast({html: e.message});
        this.form.enable()
      },
      error => {
        // console.log('message')
        console.log(error);
        M.toast({html: error.error.message});
        this.form.enable()
      }
    )
  }

}
