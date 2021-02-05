import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  submitted: boolean = false;
  canSubmit: boolean = false;
  siteKey: string = '';
  loading: boolean = false;
  isNewRegister: boolean = true;


  /**
   * Constructor
   * @param _formBuilder 
   */
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  /**
   * On Init lifecycle
   */
  ngOnInit(): void {

    this.registerForm = this.createRegisterForm();

    // check for change password values to match confirmation password values
    this.registerForm.valueChanges.subscribe(() => this.registerForm.get('passwordConfirm').updateValueAndValidity);

  }

  /**
   * On Destroy 
   */

   ngOnDestroy():void {

    // this.registerForm.unsubscribe

   }  

    /**
     * Creates register form
     * @returns FormGroup
     */
    createRegisterForm(): FormGroup
    {
        let regexPhone = '^[\+]?[(]?[1-9]{1}[)]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$';

        return this._formBuilder.group({
            firstName           : ['', Validators.required],
            lastName           : ['', Validators.required],
            areaCode           : [{value : "+91", disabled: true}, Validators.required],
            phoneNumber           : ['', [Validators.required, Validators.pattern(regexPhone)]],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required], //More patterns for strong passwords can be added in later phases
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],

        });
    }

    // convenience getter for easy access to form fields
    get controlGetter() { return this.registerForm.controls; }


    /**
     * On submitting form
     */

    onSubmit(): void
    {
      this.loading = true;
      let toSend = this.registerForm.getRawValue()

      setTimeout(() => {
        this.loading = false;
        this.toggleRegisterForm();
        this.registerForm.reset();
        this.registerForm.patchValue({areaCode: '+91'})
      }, 2000);


    }


    /**
     * toggles view of forms
     */
    toggleRegisterForm():void
    {
      this.isNewRegister = !this.isNewRegister
    }




}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  console.log('reached :>> ');
  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};

