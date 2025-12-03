import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassRequest } from '../../../core/schemas/classRequest.schema';
import { ClassServiceService } from '../../../core/service/class-service.service';
import { ClassModalComponent } from "../class-modal/class-modal.component";

@Component({
  selector: 'app-add-class-card',
  imports: [CommonModule, ReactiveFormsModule, ClassModalComponent],
  templateUrl: './add-class-card.component.html',
  styleUrl: './add-class-card.component.css'
})
export class AddClassCardComponent {

  @Output() classCreated = new EventEmitter<void>();

  isModalOpen: boolean = false;
  private readonly classService = inject(ClassServiceService);

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(classData: ClassRequest): void {
    this.classService.createClass(classData).subscribe({
      next: (response) => {
        this.closeModal();
        this.classCreated.emit();
      },
      error: (error) => {
        console.error('Error creating class:', error);
      }
    });
  }
}
