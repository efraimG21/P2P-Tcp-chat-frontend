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
import {UserFormInterface} from "../../interfaces/user-interface";

@Component({
  selector: 'app-sign-on-page',
  templateUrl: './sign-on-page.component.html',
  styleUrl: './sign-on-page.component.scss'
})
export class SignOnPageComponent {
  userForm: FormGroup;
  userName: FormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]);
  ipAddress: FormControl = new FormControl('', [Validators.required, this.ipAddressValidator()]);
  port: FormControl = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(65535)]);
  private readonly ipAddressRegex = /^[0-9.]$/;

  constructor(protected userHandlingService: UserHandlingService, protected formBuilder: FormBuilder) {
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

  onSubmit() {
    console.log('you have been submit');
    const body: UserFormInterface = {
      name: this.userName.value,
      ipAddress: this.ipAddress.value,
      port: this.port.value,
    }
    this.userHandlingService.createUser(body);
  }

  private ipAddressValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ipAddress = control.value as string;
      const ipAddressGroups = ipAddress.split('.');
      const minMaxLengthGroupRegex = /^\d{1,3}$/;

      if (!ipAddress) {
        return {ipAddressInvalid: true};
      }

      if (!this.ipAddressRegex.test(ipAddress) && ipAddressGroups.length !== 4) {
        return {ipAddressInvalid: true};
      }

      for (const group of ipAddressGroups) {
        if (parseInt(group) > 255 || !minMaxLengthGroupRegex.test(group)) {
          return {ipAddressInvalid: true};
        }
      }

      return null;
    };
  }
}
