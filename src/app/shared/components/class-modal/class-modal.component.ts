import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClassResponse } from '../../../core/schemas/classResponse.schema';
import { ClassRequest } from '../../../core/schemas/classRequest.schema';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-modal',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './class-modal.component.html',
  styleUrl: './class-modal.component.css'
})
export class ClassModalComponent implements OnChanges{

  private readonly formBuilder = inject(FormBuilder)

  @Input() isOpen: boolean = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() classData?: ClassResponse; 
  
  @Output() close = new EventEmitter<void>();
  @Output() submitClass = new EventEmitter<ClassRequest>();

  classForm!: FormGroup;
  constructor(){
    this.classForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnChanges(changes:SimpleChanges):void{

    if (changes['isOpen'] || changes['classData']) {
      if (this.isOpen && this.mode === 'edit' && this.classData) {
        this.classForm.patchValue({
          name: this.classData.name,
          description: this.classData.description
        });
      } else if (this.isOpen && this.mode === 'create') {
        this.classForm.reset();
      }
    }

  }

  onSubmit(): void {
    if (this.classForm.valid) {
      this.submitClass.emit(this.classForm.value);
      this.classForm.reset();
    }
  }

  closeModal(): void {
    this.close.emit();
    this.classForm.reset();
  }

  get modalTitle(): string {
    return this.mode === 'create' ? 'Create Class' : 'Edit Class';
  }

  get submitButtonText(): string {
    return this.mode === 'create' ? 'Create Class' : 'Save Changes';
  }


}
