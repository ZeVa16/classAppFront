import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ClassResponse } from '../../../core/schemas/classResponse.schema';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth-service.service';
import { EnrollmentService } from '../../../core/service/enrollment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classcard',
  standalone:true,
  imports: [],
  templateUrl: './classcard.component.html',
  styleUrl: './classcard.component.css'
})
export class ClasscardComponent {

  readonly authService = inject(AuthService)
  private readonly enrollService = inject(EnrollmentService)
  private readonly router= inject(Router)
  private readonly toast = inject(ToastrService)


  @Input() classData!:ClassResponse;

  @Output() details:boolean = true;

  @Output() clickEvent = new EventEmitter()
  


  goToClass(classId:number):void{
    this.router.navigate(['/dashboard/class',classId])
  }

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
