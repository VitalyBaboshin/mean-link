import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthServices} from "./auth.services";
import {stringify} from "querystring";

@Injectable({
  providedIn: "root"
})

export class HttpService {
  readonly URL_API = "/api/link"
  constructor(private http: HttpClient,
              private auth: AuthServices) {}

  public create(link: string): Observable<any> {
    return this.http.post(`${this.URL_API}/generate`, {from: link})
  }

  public getLink(linkId:string): Observable<any> {
    return this.http.get(`${this.URL_API}/${linkId}`)
  }

  public deleteLink(link: string): Observable<any> {
    return this.http.delete(`${this.URL_API}/${link}`)
  }

  public getAllLink(): Observable<any> {
    return this.http.get(`${this.URL_API}`)
  }
}
