import { HttpEvent, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class peticionInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL' + req.url)

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhdWwucGFlekBvdXRsb29rLmNvbSIsImlkIjoxLCJpYXQiOjE3NDQ1MjA5MTcsImV4cCI6MTc0NDUyMTc5N30.Gyg779VaayH1yY6Eer5WrUsuv845RPePvwDrCrzf_lA"

    let peticion = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token

      }//aumentar la e para el token
    })
    return handler.handle(peticion).pipe(tap(() => { },
      (error: any) => {
        console.log("ERRORRRRRRRRR")
        if (error instanceof HttpErrorResponse) {
          if (error.status !== 401) {
            return
          }
          this.router.navigate(["auth/login"])
        }
      }
    ))
  }

}
