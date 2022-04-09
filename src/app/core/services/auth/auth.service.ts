import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {urlApi} from "../url/url";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }


  logearse(username: string, password: string): Observable<any> {


    return this.http.post(urlApi + "account/loginEmployes", {
      email:username,
      password
    });

  }

}
