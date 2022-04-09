import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


  constructor(private router:Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("entre aca")


    let request = req;


      request = req.clone({

        setHeaders: {
          Authorization: ""+this._getToken()

        },



      });

    console.log(request)



    return next.handle(request).pipe(catchError((err:HttpErrorResponse )=> {

      console.log(err)

 /*     if(err.status==404 || err.status==400  || err.status==401 || err.status==502){
        localStorage.clear();
        this.router.navigate(["/"]);
      }*/


      return throwError(err);

    }));
  }


  private _getToken() {
    return localStorage.getItem("token")
  }



}
