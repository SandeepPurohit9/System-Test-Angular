import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  forgotForm: FormGroup;
  canSubmit: boolean = false;
  siteKey: string = '';
  loading: boolean = false;
  emailSent:boolean = false;

  /**
   * Constructor
   * @param _formBuilder 
   */
  constructor(
    private _formBuilder: FormBuilder
  ) {
      // initializing site key based on environment
      this.siteKey = environment.recaptchaKey;
   }

  ngOnInit(): void {

    this.forgotForm = this.createForgotPasswordForm();

  }

    /**
     * Creates forgot password form
     * @returns FormGroup
     */
    createForgotPasswordForm(): FormGroup
    {
      return this._formBuilder.group({

        email : ['', [Validators.required, Validators.email]],
        recaptcha: ['', Validators.required]

      })


    }

        // convenience getter for easy access to form fields
        get controlGetter() { return this.forgotForm.controls; }



    // Handle captcha Success

    handleSuccess(event: Event) {

      // console.log('Captcha Sucess event :', event);
        this.canSubmit = false;
        this.forgotForm.patchValue({recaptcha: event})
    }
    

  /**
     * On submitting form
     */

    onSubmit(): void
    {
      this.loading = true;
      let toSend = this.forgotForm.getRawValue()

      setTimeout(() => {
        this.loading = false;
      }, 2000);


    }



      //  Handle error for captcha
    
      handleError() {
    
      // console.log('Captcha Error Called :');
        this.canSubmit = true;
    
    
      }
    
      //  Handle expire for captcha
      handleExpire() {
      // console.log(' Captcha Expire Called :');
        this.canSubmit = true;
      }
    
      handleReset() {
      // console.log(' Captcha Reset Called :');
        this.canSubmit = true;
      }
    
      handleLoad() {
        this.canSubmit = true;
      }
}
