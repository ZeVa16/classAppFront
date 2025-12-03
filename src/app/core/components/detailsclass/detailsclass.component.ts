import { Component, inject, Input } from '@angular/core';
import { ClassResponse } from '../../schemas/classResponse.schema';
import { ClassServiceService } from '../../service/class-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentResponse } from '../../schemas/studentResponse.schema';
import { StudentCardComponent } from '../../../shared/components/student-card/student-card.component';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { ClassRequest } from '../../schemas/classRequest.schema';
import { ClassModalComponent } from "../../../shared/components/class-modal/class-modal.component";

@Component({
  selector: 'app-detailsclass',
  standalone:true,
  imports: [StudentCardComponent, NavBarComponent, CommonModule, ClassModalComponent],
  templateUrl: './detailsclass.component.html',
  styleUrl: './detailsclass.component.css'
})
export class DetailsclassComponent {
  
  private readonly classService = inject(ClassServiceService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private readonly toastr = inject(ToastrService)
  
  classDetailsData!:ClassResponse;
  students:StudentResponse[] = [];
  classId:number= 0;
  isEditModalOpen: boolean = false;


  constructor(){
    this.classId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.classId){
      this.loadClassDetails(this.classId);
      this.loadStudents(this.classId);
    }
  }

  loadClassDetails(classId:number):void{
    this.classService.getClassById(classId).subscribe({
      next:((response)=>{
        this.classDetailsData= response.data
      }),
      error:(error)=>{
        this.toastr.error('Error loading details')
      }
    })
  }

  loadStudents(classId:number):void{
    this.classService.getStudentsFromClass(classId).subscribe({
      next:((response)=>{
        this.students = response.data
        console.log(this.students)
      })
    })
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  onUpdate(classData: ClassRequest): void {
    this.classService.updateClass(classData, this.classId).subscribe({
      next: (response) => {
        this.classDetailsData = response.data;
        this.closeEditModal();
      },
      error: (error) => {
        this.toastr.error('Error updating class', 'Error');
      }
    });
  }

  deleteClass(): void {
    this.classService.deleteClass(this.classId).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.toastr.error('Error deleting class', 'Error');
      }
    });
  }

  goToDashboard():void{
    this.router.navigate(['/dashboard'])
  }
  
} 
