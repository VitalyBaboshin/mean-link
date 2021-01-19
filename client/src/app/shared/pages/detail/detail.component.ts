import { Component, OnInit } from '@angular/core';
import {Link} from "../../../services/interfaces";
import {Observable} from "rxjs";
import {HttpService} from "../../../services/http.service";
import {ActivatedRoute, Params} from "@angular/router";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  link$: Observable<Link>;

  constructor(private httpService: HttpService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.link$ = this.httpService.getLink(this.route.snapshot.params.id)
  }
}
