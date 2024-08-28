import { Component } from '@angular/core';
import { FamilaProductora, Familia } from '../models/FamiliaProductora';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-form-familia',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormModule
  ],
  templateUrl: './form-familia.component.html',
  styleUrl: './form-familia.component.css'
})
export class FormFamiliaComponent {

  familia: Familia = new Familia(null);
  validateForm: FormGroup;
  edit: boolean = false;

  constructor(private fb: FormBuilder){
    this.validateForm = this.fb.group({
      id: [null],
      nombre: [null, Validators.required]
    })
  }

  patchFormValues(input: FamilaProductora){
    if(input){
      this.familia = input;
      this.edit = true;
      this.validateForm.patchValue(this.familia);
    }
  }

  submitForm(): Familia {
    let usr = new Familia(this.validateForm.getRawValue());
    return usr;
  }
}
