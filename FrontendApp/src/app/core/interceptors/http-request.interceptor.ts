import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req).pipe(
      tap((httpResponse: any) => {
        if (httpResponse?.body?.success === true) {
          alert(httpResponse.body.message);
        }
        else if (httpResponse?.body?.success === false) {
          alert(httpResponse.body.message);
        }
      }), catchError((httpErrorResponse: any) => {
        if (httpErrorResponse.error.message) {
          alert(httpErrorResponse.error.message);
        }
        else {
          alert(httpErrorResponse.message);
        }
        // in case of 401 || 403 http error logout
        if (httpErrorResponse.status === 401 || httpErrorResponse.status === 403) {
          alert('do logout');
        }
        // of error operator transform in observable
        // return of(err.statusText);
        return throwError(httpErrorResponse);
      })
    );
  }
}

