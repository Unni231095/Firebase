import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/common/api-call/api-call.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Mainlist = [];

  constructor(
    private router: Router,
    private apiCallService: ApiCallService,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() { }

  logoutButtonClick() {
    console.log(JSON.parse(sessionStorage.getItem('googleLogin')));
    if (JSON.parse(sessionStorage.getItem('googleLogin'))) {
      return this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['login']);
        sessionStorage.clear();
      });
    } else {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  }
}
