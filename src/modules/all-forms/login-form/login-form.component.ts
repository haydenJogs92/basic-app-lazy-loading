import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


//Services
import { UserService } from '../../core/services/user-service';
import { ValidationService } from '../../core/services/validation-service'

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.css'],
})


export class LoginFormComponent
{

  public loginForm: FormGroup;
  public formErrors: boolean = false;
  public formErrorMessage: string;
  public bIsProcessingLogin: boolean = false;
  public bLoginSuccess: boolean = false;

  constructor( public userService: UserService,
               public form: FormBuilder) {}

    ngOnInit()
    {
      this.initializeLoginForm();
    }

    initializeLoginForm()
    {
      this.loginForm = this.form.group({
        sEmail : ['', [Validators.required, ValidationService.isEmailValid] ],
        sPassword : ['', Validators.required],
        });
    }

    loginUser()
    {
      this.bIsProcessingLogin = true;
      this.userService.userLoginRequest( this.loginForm.value.sEmail, this.loginForm.value.sPassword )
      .subscribe( result => {
          if ( result.error )
          {
            this.formErrorMessage = result.message;
          }
          else
          {
            this.formErrors = false;
            this.bLoginSuccess = true;
            this.formErrorMessage = '';
          }
          this.bIsProcessingLogin = false;
      })
    }

    showFormErrors()
    {
      for (var key in this.loginForm.controls)
      {
        this.loginForm.controls[key].markAsTouched();
      }
      this.formErrors = true;
      this.formErrorMessage = 'Please provide valid email and password.';
    }


}
