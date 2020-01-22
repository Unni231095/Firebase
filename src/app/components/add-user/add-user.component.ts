import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/common/api-call/api-call.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public userDetails: any = {
    email: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
    username: '',
  };

  constructor(
    private apiCallService: ApiCallService,
    public toastr: ToastrService
  ) { }

  ngOnInit() { }

  addButtonClick() {
    const addUserData: any = {
      email: this.userDetails.email,
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      mobileNumber: this.userDetails.mobileNumber
    };
    this.apiCallService.addUserDetails(addUserData);
    const addUserCredentialData: any = {
      username: this.userDetails.username,
      password: this.userDetails.password
    };
    this.apiCallService.addUser(addUserCredentialData);
    this.toastr.success('Success');
  }
}
