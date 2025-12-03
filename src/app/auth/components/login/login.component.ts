import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../schemas/loginRequest.schema';
import { Toast, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authService= inject(AuthService)
  private readonly formBuilder= inject(FormBuilder)
  private readonly router =inject(Router)
  private readonly toast =inject(ToastrService)


  readonly loginForm:FormGroup;

  constructor(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }

  redirectTo(route:string):void{
    this.router.navigate([route])
  }
  onSubmit():void{
    this.logIn();
  }

  private logIn(): void{
    const credentials:LoginRequest = this.loginForm.value;
    this.authService.signIn(credentials).subscribe({
      next:(response)=>{
        this.router.navigate(['dashboard'])
      },
      error:(error)=>{
        this.loginForm.markAllAsTouched();
        this.toast.error("Error","Check your credentials")
      }
    })
  }
}
