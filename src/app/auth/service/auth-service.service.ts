import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Api } from '../../utils/api';
import { environment } from '../../../../enviorment/enviorment';
import { LoginRequest } from '../schemas/loginRequest.schema';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { GlobalResponse } from '../../shared/schemas/global-response.schema';
import { AuthResponse, userType } from '../schemas/auth-response.schema';
import { RegisterRequest } from '../schemas/register.schema';
import { Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private readonly http = inject(HttpClient)
  private readonly authUrl = `${environment.apiUrl}${Api.V1_ROUTE}${Api.AUTH}`;
  private readonly token = "access-token";
  private readonly router = inject(Router)
  private readonly toast = inject(ToastrService)
  private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private userTypeSubject = new BehaviorSubject<userType | null>(null);
  public userType = this.userTypeSubject.asObservable()
  
  constructor() {
    this.loadUserTypeFromStorage();
    this.checkAuth();
  }


  signIn(credentials: LoginRequest):Observable<GlobalResponse<AuthResponse>>{
    return this.http.post<GlobalResponse<AuthResponse>>(`${this.authUrl}/login`,credentials,{withCredentials:true}).pipe(
      tap((response) =>{
        this.saveAuthData(response.data);
        this.isAuthenticatedSubject.next(true);
        this.toast.success("Login Succesfully","Great")
      }),
      catchError(this.handleAuthError)
    )   
  }

  signUp(credentials:RegisterRequest):Observable<GlobalResponse<AuthResponse>>{
    return this.http.post<GlobalResponse<AuthResponse>>(`${this.authUrl}/register`,credentials,{withCredentials:true}).pipe(
      tap((response)=>{
        this.saveAuthData(response.data);
        this.isAuthenticatedSubject.next(true);
        this.toast.success("Sign in Succesfully","Great")
      })
  )}
  

  checkAuth():void{
    this.http.get<GlobalResponse<void>>(`${this.authUrl}/verify`,{withCredentials:true})
    .subscribe({
      next:(response) =>{
        this.isAuthenticatedSubject.next(true);
        console.log(response)
      },
      error:(error)=>{
        this.isAuthenticatedSubject.next(false);
        console.log(error)
      }
    })
  }

  logOut():void{
    this.http.post<GlobalResponse<void>>(`${this.authUrl}/logout`,{})
    .subscribe({
      next:(response)=>{
        this.clearSession()
        this.router.navigate(["auth/login"])
      },
      error:(error)=>{
        console.log('Somenthing happened')
        this.router.navigate(['/'])
      }
    })
      
  }

  private handleAuthError(error:HttpErrorResponse):Observable<never>{
    const backErrorMessage = error.error?.message;
    let errorMessage:string;

    if (error.status === 401) {
      errorMessage = backErrorMessage || 'Acceso no autorizado. Verifica tus credenciales.';
    } else if (error.status === 400 || error.status === 409) {
      errorMessage = backErrorMessage || 'Error en los datos proporcionados.';
    } else {
      errorMessage = `Error de conexión o servidor (${error.status}).`;
    }

    this.toast.error(errorMessage, 'Failed');
    return throwError(() => new Error(errorMessage));
  }

  saveAuthData(response: AuthResponse){
    localStorage.setItem(this.token,response.token)
    localStorage.setItem('user-type',response.userType)
    this.userTypeSubject.next(response.userType);
    console.log(this.userTypeSubject)
  } 

  clearSession():void{
    this.isAuthenticatedSubject.next(false)
    localStorage.removeItem(this.token)
    localStorage.removeItem("user-type")
  }

  isStudent():boolean{
    return this.userTypeSubject.getValue() === "STUDENT";
  }
  

  isTeacher():boolean{
    return this.userTypeSubject.getValue() === "TEACHER";
  }

  private loadUserTypeFromStorage(): void {
    const storedType = localStorage.getItem('user-type');
    if (storedType === 'STUDENT' || storedType === 'TEACHER') {
        this.userTypeSubject.next(storedType);
    }
}


}
