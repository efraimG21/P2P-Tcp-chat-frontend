import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserHandlingService} from "../../services/user/user-handling.service";

@Component({
  selector: 'app-sign-on-page',
  templateUrl: './sign-on-page.component.html',
  styleUrl: './sign-on-page.component.scss'
})
export class SignOnPageComponent {
  userForm: FormGroup;
  userName: FormControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]);
  ipAddress: FormControl = new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]);
  port: FormControl = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(8000)]);

  constructor(public userHandlingService: UserHandlingService, formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      username: this.userName,
      ipAddress: this.ipAddress,
      port: this.port,
    })
  }

  validateIPAddressKeyPress(event: KeyboardEvent) {
    const regex = /^[0-9.]$/;
    const ipAddressValue = this.ipAddress.value + event.key;
    const addressGroups = ipAddressValue.split('.');
    const lastAddressGroup = addressGroups[addressGroups.length - 1];

    if (!regex.test(event.key)) {
      event.preventDefault();
      return;
    }

    if (addressGroups.length < 4 && (parseInt(lastAddressGroup) > 255 || lastAddressGroup.length > 3)) {
      event.preventDefault();
      this.ipAddress.setValue(this.ipAddress.value + '.' + event.key);
      return;
    }

    if (lastAddressGroup.length > 3 && addressGroups.length < 4) {
      event.preventDefault();
      this.ipAddress.setValue(this.ipAddress.value + '.' + event.key);
      return;
    }

    if (parseInt(lastAddressGroup) > 255) {
      event.preventDefault();
      return;
    }
  }

  onSubmit() {
    // this.userHandlingService.isUserExists()
  }
}
