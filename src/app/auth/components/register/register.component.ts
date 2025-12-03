import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../schemas/register.schema';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly authService= inject(AuthService)
  private readonly formBuilder = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly toast = inject(ToastrService)

  readonly registerForm:FormGroup;

  constructor(){
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      userType:['',[Validators.required]],
    })
  }

  onSubmbit():void{
    this.register()
  }

  private register():void{
    const credentials:RegisterRequest= this.registerForm.value;

    this.authService.signUp(credentials).subscribe({
      next:(response)=>{
        this.toast.success("Account Created","Now log in ")
        this.router.navigate(['/auth/login'])
      },
      error:(error)=>{
        this.toast.error("Error creating your account");
        this.registerForm.markAllAsTouched();
      }
    })
  }


}
