import { Component, inject } from '@angular/core';
import { ClassResponse } from '../../schemas/classResponse.schema';
import { ClassServiceService } from '../../service/class-service.service';
import { ClasscardComponent } from "../../../shared/components/classcard/classcard.component";
import { AddClassCardComponent } from "../../../shared/components/add-class-card/add-class-card.component";
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-dashboard',
  standalone:true,
  imports: [AddClassCardComponent, ClasscardComponent, NavBarComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent {
  private readonly classService = inject(ClassServiceService)
  private readonly toast = inject(ToastrService)
  
  classes: ClassResponse[]= [];

  ngOnInit():void{
    this.loadClasses()
  }


  loadClasses():void{
    this.classService.getMyClasses().subscribe({
      next:(response)=>{
        this.classes = response.data;
        console.log(this.classes)
      },
      error:(error)=>{
        console.log(error)
        this.toast.error("Error loading classes")
      }
    })
  }
}
