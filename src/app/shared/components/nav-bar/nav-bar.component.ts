import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { AuthService } from '../../../auth/service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone:true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  @Input() toggleNavbar :boolean = false

  @Output() viewToggle = new EventEmitter<boolean>();

  redirectMyClasses():void{
    this.router.navigate(["/dashboard"])
  }


  logOut():void{
    this.authService.logOut()
  }

} 
