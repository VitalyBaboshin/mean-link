import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthServices} from "../../../services/auth.services";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent{
  @Input() link: string;
  constructor(public httpLink: HttpService,
              public router: Router,
              public auth: AuthServices) { }

  enter($event: any) {
    this.httpLink.create(this.link).subscribe( req => {
        this.router.navigate([`/detail/${req.link._id}`])
    })
  }

}
