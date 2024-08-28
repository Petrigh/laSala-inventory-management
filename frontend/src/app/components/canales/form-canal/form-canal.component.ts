import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Canal, Channel } from '../models/Canal';
import { CanalService } from '../services/canal.service';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-form-canal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzSelectModule,
  ],
  templateUrl: './form-canal.component.html',
  styleUrl: './form-canal.component.css'
})
export class FormCanalComponent implements OnInit {
  canal: Channel = new Channel(null);
  validateForm: FormGroup;
  edit: boolean = false;
  tipos: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private canalService: CanalService
  ){
    this.validateForm = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      tipo: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.canalService.getTipoCanales().subscribe((tipos) =>  this.tipos = tipos);
  }

  submitForm(): Channel {
    let chn = new Channel(this.validateForm.getRawValue());
    return chn;
  }

  patchFormValues(input: Canal){
    if(input){
      this.canal = input;
      this.edit = true;
      this.validateForm.patchValue(this.canal);
    }
  }  
}
