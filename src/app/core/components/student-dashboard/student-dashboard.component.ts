import { Component, inject } from '@angular/core';
import { ClasscardComponent } from '../../../shared/components/classcard/classcard.component';
import { AddClassCardComponent } from "../../../shared/components/add-class-card/add-class-card.component";
import { ClassServiceService } from '../../service/class-service.service';
import { ClassResponse } from '../../schemas/classResponse.schema';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../service/enrollment.service';
import { EnrollResponse } from '../../schemas/enrollResponse.schema';
import { EnrollCardComponent } from '../../../shared/components/enroll-card/enroll-card.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-student-dashboard',
  imports: [ClasscardComponent,EnrollCardComponent , NavBarComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  private readonly router = inject(Router)
  private readonly classService = inject(ClassServiceService)
  private readonly enrollService = inject(EnrollmentService)
  
  classesTogle: boolean= false ;

  classes: ClassResponse[]= [];
  myClasses: EnrollResponse[]= [];

  ngOnInit():void{
    this.loadClasses()
    this.loadMyClasses()
  }
  
  toggleClasses(term : boolean):void{
    this.classesTogle = term
    this.loadMyClasses()
  }
  
  
  loadClasses():void{
    this.classService.getClasses().subscribe({
      next:(response)=>{
        this.classes = response.data;
        console.log(this.classes)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  loadMyClasses():void{
    this.enrollService.myEnrolledClasses().subscribe({
      next:(response)=>{
        this.myClasses = response.data
        console.log(this.myClasses)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
