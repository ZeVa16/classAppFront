import { Component, inject } from '@angular/core';
import { ClassServiceService } from '../../../core/service/class-service.service';
import { ClassResponse } from '../../../core/schemas/classResponse.schema';
import { AuthService } from '../../../auth/service/auth-service.service';
import { StudentDashboardComponent } from '../../../core/components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from '../../../core/components/teacher-dashboard/teacher-dashboard.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ NgIf, StudentDashboardComponent,TeacherDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  readonly authService = inject(AuthService)
  private readonly classService = inject(ClassServiceService)

  classes: ClassResponse[]= [];

  // ngOnInit():void{
  //   this.loadClasses()
  // }


  // loadClasses():void{
  //   this.classService.getMyClasses().subscribe({
  //     next:(response)=>{
  //       this.classes = response.data;
  //       console.log(this.classes)
  //     },
  //     error:(error)=>{
  //       console.log(error)
  //     }
  //   })
  // }
}
