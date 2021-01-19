import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthServices} from "./auth.services";

@Injectable({
  providedIn: "root"
})

export class HttpService {
  constructor(private http: HttpClient,
              private auth: AuthServices) {}

  public create(link: string): Observable<any> {
    return this.http.post('/api/link/generate', {from: link})
  }

  public getLink(linkId:string): Observable<any> {
    return this.http.get(`/api/link/${linkId}`)
  }

  public getAllLink(): Observable<any> {
    return this.http.get('/api/link')
  }
}
