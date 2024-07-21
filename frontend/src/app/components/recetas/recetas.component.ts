import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormLayoutType, NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Receta } from './models/recetas';
import { RecipeService } from './services/recipe.service';
import { AbmComponent } from '../abm/abm.component';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [
    NzModalModule,
    AbmComponent,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent implements OnInit{

  listRecetas: Receta[] = [];

  isVisible = false;
  isOkLoading = false;

  validateForm: FormGroup<{
    formLayout: FormControl<NzFormLayoutType>;
    fieldA: FormControl<string>;
    filedB: FormControl<string>;
  }> = this.fb.group({
    formLayout: 'horizontal' as NzFormLayoutType,
    fieldA: ['', [Validators.required]],
    filedB: ['', [Validators.required]]
  });



  constructor(
    private recetasService: RecipeService,
    private fb: NonNullableFormBuilder
  ){}

  ngOnInit(): void {
    this.recetasService.getRecetasMock().subscribe(
      (recetas)=> {
        this.listRecetas = recetas;
      }
    );
  }

  showModal(){
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  /* Eventos del formulario */
  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout.value === 'horizontal';
  }

}
