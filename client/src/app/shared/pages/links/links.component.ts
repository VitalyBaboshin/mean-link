import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {Link} from "../../../services/interfaces";
import * as M from 'materialize-css';


@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit{
  @ViewChild("collaps", {static: true}) firstChild: ElementRef;
  @Output() linksLocal: Link[];

  removeLink: boolean;
  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpService.getAllLink().subscribe(links => {
      this.linksLocal = links;
    })
    M.Collapsible.init(this.firstChild.nativeElement);
  }


  remove(_id: string) {
    this.removeLink = true;
    this.httpService.deleteLink(_id).subscribe((status) => {
      this.linksLocal = this.linksLocal.filter(link => link._id !== _id)
      M.toast({html: status.message});
      this.removeLink = false;
    })
  }


}
