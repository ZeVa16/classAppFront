import { Component, inject, Input } from '@angular/core';
import { EnrollmentService } from '../../../core/service/enrollment.service';
import { ToastrService } from 'ngx-toastr';
import { EnrollResponse } from '../../../core/schemas/enrollResponse.schema';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enroll-card',
  imports: [CommonModule],
  templateUrl: './enroll-card.component.html',
  styleUrl: './enroll-card.component.css'
})
export class EnrollCardComponent {

  private readonly enrollService = inject(EnrollmentService)
  private readonly toast = inject(ToastrService)

  @Input() classData!:EnrollResponse;

  enrollIn(classId:number):void{
    this.enrollService.enrollIn(classId).subscribe({
      next:(response)=>{
        this.toast.info("You can watch your enrolled class")
      },
      error:(error)=>{
        if(error.status === 409){
          this.toast.warning('You are alredy in this class')
        }else{
          this.toast.error("There was an error joining this class.")
        }
    
      }
    })
  }
}
