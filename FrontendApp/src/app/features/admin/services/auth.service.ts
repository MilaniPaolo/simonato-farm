import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { share } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private $isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);

  constructor(private http: HttpClient) { }

  login({username, password}): Observable<any> {
    const $req = this.http.post<any>(`${environment.apiUrl}/auth/login`, {username, password})
      .pipe(share());
    $req.subscribe((res) => {
      if (res) {
        this.$isLogged.next(true);
        console.log('User correctly logged');
      }
    }, err => {
      console.log('Error on logged user', err);
    });
    return $req;
  }

  get isLogged(): Observable<boolean> {
    return this.$isLogged.asObservable();
  }
}
