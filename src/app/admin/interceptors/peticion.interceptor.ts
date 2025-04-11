import { HttpEvent, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class peticionInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL' + req.url)

    let peticion = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhdWwucGFlekBvdXRsb29rLmNvbSIsImlkIjoxLCJpYXQiOjE3NDQzMzUzOTIsImV4cCI6MTc0NDMzNjI3Mn0.bTN_DU9679jTGyg7GQk1NGqHkmCDc_mHqE3hheN3_wQ'
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
