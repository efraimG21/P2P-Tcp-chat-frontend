import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UserHandlingService} from "../../services/user/user-handling.service";
import {group} from "@angular/animations";

@Component({
  selector: 'app-sign-on-page',
  templateUrl: './sign-on-page.component.html',
  styleUrl: './sign-on-page.component.scss'
})
export class SignOnPageComponent {
  private readonly ipAddressRegex = /^[0-9.]$/;
  userForm: FormGroup;
  userName: FormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]);
  ipAddress: FormControl = new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]);
  port: FormControl = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(65535)]);

  constructor(public userHandlingService: UserHandlingService, formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      username: this.userName,
      ipAddress: this.ipAddress,
      port: this.port,
    })
  }

  validateIPAddressKeyPress(event: KeyboardEvent) {
    const ipAddressValue = this.ipAddress.value + event.key;
    const addressGroups = ipAddressValue.split('.');
    const lastAddressGroup = addressGroups[addressGroups.length - 1];

    if (!this.ipAddressRegex.test(event.key)) {
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

    if (parseInt(lastAddressGroup) > 255 || lastAddressGroup.length === 4) {
      event.preventDefault();
      return;
    }
  }

  // private ipAddressValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const ipAddress = control.value as string;
  //     const ipAddressGroups = ipAddress.split('.');
  //
  //     if (!this.ipAddressRegex.test(ipAddress) || ipAddressGroups.length !== 4) {
  //       return {ipAddressInvalid: true};
  //     }
  //
  //     for (const group of ipAddressGroups) {
  //       if (parseInt(group) > 255 || group.length > 3) {
  //         return {ipAddressInvalid: true};
  //       }
  //     }
  //     console.log(null);
  //     return null;
  //   };
  // }

  onSubmit() {
    console.log('you have been submit');
    // this.userHandlingService.isUserExists()
  }
}
