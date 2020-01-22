import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiCallService } from 'src/app/common/api-call/api-call.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, OnDestroy {

  public userDetailsList: any = [];
  private subscriptionUserDetails: any;

  constructor(
    private apiCallService: ApiCallService
  ) { }

  ngOnInit() {
    this.listUserDetails();
  }

  ngOnDestroy() {
    this.subscriptionUserDetails.unsubscribe();
  }

  listUserDetails() {
    const userDetailsSnapshot = this.apiCallService.getDetails().snapshotChanges();
    this.subscriptionUserDetails = userDetailsSnapshot.subscribe((success) => {
      success.forEach((item) => {
        this.userDetailsList.push(item.payload.toJSON());
      });

    }, (error) => {
      console.log(error);
    });
  }

}
