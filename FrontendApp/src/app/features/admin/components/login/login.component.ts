import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private $unsubscribe = new Subject<void>();

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = new FormBuilder().group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.isLogged
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(async (isLogged: boolean) => {
        if (isLogged) {
          await this.router.navigate(['admin']);
        }
      });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
  }

  doLogin(): void {
    this.authService.login(this.loginForm.getRawValue());
  }
}
