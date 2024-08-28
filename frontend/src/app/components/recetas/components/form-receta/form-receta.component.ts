import { Component, OnInit } from '@angular/core';
import { Receta, Recipe, Ingrediente, Type } from '../../models/recetas';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BienService } from '../../services/bienes.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-form-receta',
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
  templateUrl: './form-receta.component.html',
  styleUrl: './form-receta.component.css'
})
export class FormRecetaComponent implements OnInit {
  receta: Recipe = new Recipe(null);
  validateForm: FormGroup;
  edit: boolean = false;
  buscarIcon = faPlus;
  eliminarIcon = faTrash;
  selectedValue: number | null = null;
  visible = false;
  newProdID: number = -1;

  ingredientes: Ingrediente[] = [];
  ingReceta: Ingrediente[] = [];
  productos: Ingrediente[] = [];

  constructor(
    private fb: FormBuilder,
    private bienService: BienService,
  ){
    this.validateForm = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      producto: [null, Validators.required],
      cantidadProd: [null, Validators.required],
      descripcion: [null, Validators.required],
      ingredientes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.bienService.getMateriasPrimas().subscribe((insumos)=> this.ingredientes = insumos);
    this.bienService.getProductoss().subscribe((insumos)=> this.productos = insumos);
  }

  patchFormValues(input: Receta){
    if(input){
      this.receta = input;
      this.ingReceta = input.ingredientes;
      this.bienService.getMateriasPrimas().subscribe((insumos)=>
      {
        let idsToRemove = this.receta?.ingredientes?.map(obj => obj.id);
        this.ingredientes = insumos.filter(item => !idsToRemove?.includes(item.id));
      })
      this.edit = true;
      this.validateForm.patchValue(this.receta);
      this.validateForm.get('producto')?.patchValue(this.receta.producto.id);
      this.validateForm.get('cantidadProd')?.patchValue(this.receta.producto.cantidad);
      this.ingReceta.forEach(item => {
        this.ingredientesControls.push(
          this.fb.group({
            id: [item.id],
            cantidad: [item.cantidad, Validators.min(0.1)],
            nombre: [item.bien.nombre],
            idBien: [item.bien.id]
          })
        )
      })
    }
  }

  onCantidadChange(id: number, value: any){
    const index = this.ingReceta.findIndex(ing => ing.id == id)
    const control = this.ingredientesControls.at(index).get('cantidad');
    if(control)
      control.setValue(value);
  }

  addProduct(bien: HTMLInputElement){
    const add = {
      id: this.newProdID, cantidad: 0, precioUnitario: 0,
      bien: {
        id: 0, nombre: bien.value, tipo: Type.PRODUCTO
      }
    }
    this.productos.push(add);
    this.validateForm.get('producto')?.patchValue(this.newProdID);
    this.validateForm.get('cantidadProd')?.patchValue(0);
    this.newProdID -= 1;
  }

  addItem(item: number){
    const ingrediente = this.ingredientes.find(ing => ing.id === item);
    if (ingrediente) {
      ingrediente.cantidad = 0;
      this.ingReceta = this.ingReceta.concat([ingrediente]);
      this.ingredientes = this.ingredientes.filter(ing => ing.id !== item);
      this.selectedValue = -1;
      this.ingredientesControls.push(
        this.fb.group({
          id: [ingrediente.id],
          cantidad: [ingrediente.cantidad, Validators.min(0.1)],
          nombre: [ingrediente.bien.nombre],
          idBien: [ingrediente.bien.id]
        })
      )
    }
    this.visible = false;
  }

  deleteItem(id: number){
    if(id){
      const item = this.ingReceta.find(ing => ing.id == id);
      if(item){
        const index = this.ingReceta.indexOf(item);
        this.ingredientesControls.removeAt(index);
        this.ingredientes.push(item);
        this.ingReceta = this.ingReceta.filter(ing => ing !== item);
      }
    }
  }

  submitForm(): Recipe {
    let rec = this.validateForm.getRawValue();
    this.receta.nombre = rec.nombre;
    if(rec.id){
      this.receta.id = rec.id;      
    }
    this.receta.descripcion = rec.descripcion;
    const prod = this.productos.find(prod => prod.id === rec.producto);
    if(prod){
      prod.cantidad = rec.cantidadProd;
      this.receta.producto = prod;
    }
    this.receta.ingredientes = rec.ingredientes.map((ingrediente: any) => ({
      id: ingrediente.id,
      cantidad: ingrediente.cantidad,
      precioUnitario: 0,
      bien: {
        id: ingrediente.idBien,
        nombre: ingrediente.nombre,
        tipo: Type.MATERIAPRIMA
      }
    }));
    return this.receta;
  }

  get ingredientesControls(): FormArray {
    return this.validateForm.get('ingredientes') as FormArray;
  }
}
