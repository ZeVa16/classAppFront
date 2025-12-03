import { Component, Input } from '@angular/core';
import { StudentResponse } from '../../../core/schemas/studentResponse.schema';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-card',
  imports: [CommonModule],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent {

  @Input() studentData!: StudentResponse;
  
}
