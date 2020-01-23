import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/common/api-call/api-call.service';
import { ToastrService } from 'ngx-toastr';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public credentials = {
    username: '',
    password: ''
  };
  public userCredentialList: any = [];
  private subscription: any;

  constructor(
    private router: Router,
    private apiCallService: ApiCallService,
    private toastr: ToastrService,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loginButtonClick() {
    let validUser = false;
    const validateUserSnapshot = this.apiCallService.validateUser().snapshotChanges();
    this.subscription = validateUserSnapshot.subscribe((success) => {
      success.forEach((item) => {
        this.userCredentialList.push(item.payload.toJSON());
      });
    });

    for (const item of this.userCredentialList) {
      if (this.credentials.username === item.username && this.credentials.password === item.password) {
        validUser = true;
        break;
      }
    }
    if (validUser) {
      this.router.navigate(['dashboard/list-user']);
    } else {
      this.toastr.error('User not registered');
    }
  }

  doGoogleLogin() {
    sessionStorage.setItem('googleLogin', 'true');
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard/list-user']);
          });
        }).catch((error) => {
          window.alert(error);
        });
    });
  }
}
