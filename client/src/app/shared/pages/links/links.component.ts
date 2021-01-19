import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Link} from "../../../services/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit{
  links$: Observable<[Link]>

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.links$ = this.httpService.getAllLink();
  }

  open($event, link: string) {
    // $event.preventDefault();
    this.router.navigate([`/detail/${link}`])
  }

}
