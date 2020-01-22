import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/common/api-call/api-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Mainlist = [];

  constructor(
    private router: Router,
    private apiCallService: ApiCallService
  ) { }

  ngOnInit() { }

  logoutButtonClick() {
    this.router.navigate(['login']);
  }
}
