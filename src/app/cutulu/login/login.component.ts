import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  loginForm = this.formBuilder.group({
    name:  ['', Validators.required, {nonNullable: true}],
    password: ['', Validators.required]
  });

  name:string = '';
  pass:string = '';

  errorLogin:string = ''
  errorRegister:string = ''

  constructor(private _httpClient: ApiService, private formBuilder: FormBuilder) { }

  router = inject(Router);

  login():void{

    this.name = String(this.loginForm.get('name')?.value);
    this.pass = String(this.loginForm.get('password')?.value);


    this._httpClient.login(this.name, this.pass).subscribe({
      next: (data:any) =>{
        if (JSON.stringify(data) != '') {
          localStorage.setItem('username', this.name);
          this.router.navigate(['list']);
        }
      },
      error:(error:any) =>{
        this.errorLogin = error;
      }
    })
  }

  register():void{
    this.name = String(this.loginForm.get('name')?.value);
    this.pass = String(this.loginForm.get('password')?.value);

    this._httpClient.register(this.name, this.pass).subscribe({
      next: (data:any) =>{
        localStorage.setItem('username', this.name);
        this.router.navigate(['list']);
      },
      error:(error:any) =>{
        this.errorRegister = error;
        console.log(error)
      }
    })
  }

  hasErrors(controlName:string, errorType:string){
    return this.loginForm.get(controlName)?.hasError(errorType) && this.loginForm.get(controlName)?.touched
  }
}