import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  
  clientForm: FormGroup;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': '',
    'balance': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First Name is required.',
      'minlength': 'Must be greater than 3 characters.',
      'maxlength': 'Must be less than 30 characters.',
    },
    'lastName': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be greater than 3 characters.',
      'maxlength': 'Last Name must be less than 30 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email Invalid.'
    },
    'phone': {
      'required': 'Phone is required.'
    }
  };

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private route: Router) { }

  ngOnInit() {
    // Creation FormGroup 
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      contactPreference: ['email'],
      phone: [''],
      balance: [0]
    });

    // All Contform control valueChanges observable
    this.clientForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.clientForm);
    });

    // Subscribe to contactPreference form control valueChanges observable
    this.clientForm.get('contactPreference')
      .valueChanges.subscribe((data: string) => {
        this.onContactPrefernceChange(data);
      });

  }

  logValidationErrors(group: FormGroup = this.clientForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  // If the Selected Radio Button value is "phone", then add the
  // required validator function otherwise remove it
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.clientForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  onSubmit() {
    if(this.clientForm.valid) {
      this.clientService.newClient(this.clientForm.value);
      this.route.navigate(['/']);   
    }
  }



}
