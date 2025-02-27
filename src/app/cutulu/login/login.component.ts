import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CommonModule, ReactiveFormsModule],
    standalone: true
})

export class LoginComponent{

_httpClient = inject(ApiService);
formBuilder = inject(FormBuilder);
router = inject(Router);

  loginForm = this.formBuilder.group({
    name:  ['', Validators.required, {nonNullable: true}],
    password: ['', Validators.required]
  });

  name:string = '';
  pass:string = '';
  submited:boolean = false;

  errorLogin:string = ''
  errorRegister:string = ''

  login():void{
    this.name = String(this.loginForm.get('name')?.value);
    this.pass = String(this.loginForm.get('password')?.value);
    this.submited = true;

    if (this.name != '' && this.pass != '') {
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
  }

  register():void{
    this.name = String(this.loginForm.get('name')?.value);
    this.pass = String(this.loginForm.get('password')?.value);
    this.submited = true;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?~`-])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?~`-]{8,}$/;

    if (regex.test(this.pass)){
      if (this.name != '' && this.pass != '') {
        this._httpClient.register(this.name, this.pass).subscribe({
          next: (data:any) =>{
            localStorage.setItem('username', this.name);
            this.router.navigate(['list']);
          },
          error:(error:any) =>{
            this.errorRegister = 'El usuario ya existe';
          }
        })
      }
    }else{
      this.errorRegister = 'La contraseña tiene que tener al menos 8 caracteres, mayúsculas, minúsculas, números y algún caracter especial';
    }
  }

  hasErrors(controlName:string, errorType:string){
    return this.loginForm.get(controlName)?.hasError(errorType) && this.loginForm.get(controlName)?.touched
  }
}