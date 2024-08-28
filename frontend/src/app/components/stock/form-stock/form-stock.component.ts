import { Component } from '@angular/core';
import { BienStock, Stock } from '../models/stocks';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Type } from '../../recetas/models/recetas';

@Component({
  selector: 'app-form-stock',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzTableModule,
    NzSelectModule,
    NzDividerModule,
    NzDropdownMenuComponent,
    FontAwesomeModule
  ],
  templateUrl: './form-stock.component.html',
  styleUrl: './form-stock.component.css'
})
export class FormStockComponent {
  stock: Stock = new Stock(null);
  validateForm: FormGroup;
  edit: boolean = false;
  buscarIcon = faPlus;
  eliminarIcon = faTrash;
  selectedValue: number | null = null;
  visible = false;
  
  constructor(
    private fb: FormBuilder,
  ){
    this.validateForm = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      cantidad: [null, Validators.required],
      precioUnitario: [null, Validators.required],
      tipo: [null]
    });
  }

  setType(tipo: Type){
    this.validateForm.get('tipo')?.patchValue(tipo);
  }

  patchFormValues(input: BienStock){
    if(input){
      this.stock = input;
      this.edit = true;
      this.validateForm.patchValue(this.stock);
    }
  }

  submitForm(): BienStock {
    const bien = this.validateForm.getRawValue();
    this.stock.nombre = bien.nombre;
    if(bien.id){
      this.stock.id = bien.id;      
    }
    this.stock.cantidad = Number(bien.cantidad);
    this.stock.precioUnitario = Number(bien.precioUnitario);
    this.stock.tipo = bien.tipo;
    return this.stock;
  }
}
