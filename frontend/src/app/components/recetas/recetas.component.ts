import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, ViewContainerRef } from '@angular/core';
import { FormArray, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faPencil, faCarrot } from '@fortawesome/free-solid-svg-icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { ModalButtonOptions, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RecipeService } from './services/recipe.service';
import { UserService } from '../../services/user.service';
import { Receta } from './models/recetas';
import { FormRecetaComponent } from './components/form-receta/form-receta.component';
import { lastValueFrom } from 'rxjs';
import { DetalleRecetaComponent } from './components/detalle-receta/detalle-receta.component';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [
    NgIf, NgFor,
    CommonModule,
    FormsModule,
    NzTableModule,
    NzModalModule,
    NzDropdownMenuComponent,
    NzButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent{
  cookIcon = faCarrot;
  addIcon = faPlus;
  buscarIcon = faSearch;
  editIcon = faPencil;

  recipes: Receta[] = [];
  datosTabla: Receta[] = [];
  isAdmin: boolean = false;

  searchValue = '';
  visible = false;

  constructor(
    private recetaService: RecipeService,
    private userService: UserService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ){}


  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(
      (admin) => {
        this.isAdmin = admin;
      }
    );
    this.recetaService.getRecetas().subscribe(
      (recetas)=> {
        this.recipes = recetas;
        this.datosTabla = recetas;
      }
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.datosTabla = this.recipes.filter((item: Receta) => (item.nombre.toLocaleUpperCase().indexOf(this.searchValue.toLocaleUpperCase()) !== -1));
  }



  showReceta(item: Receta){
    const modalRef: NzModalRef = this.modal.create<DetalleRecetaComponent, Receta>({
      nzTitle: item.nombre,
      nzContent: DetalleRecetaComponent,
      nzData: item,
      nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzWidth: 750,
      nzFooter: []
    });
    modalRef.componentInstance.patch(item);
  }
  
  async onDelete(receta: number | null, modalRef: NzModalRef){
    if(!receta){
      return
    }
    await lastValueFrom(
      this.recetaService.deleteReceta(receta)
    );
    modalRef.close();
    this.recipes = await lastValueFrom(this.recetaService.getRecetas());
    this.datosTabla = this.recipes;
  }
  
  async onSubmit(edit: boolean, modal: FormRecetaComponent, modalRef: NzModalRef)
  {
    try {
      if (modal.validateForm.valid) {
        await lastValueFrom(
          this.recetaService.updateRecetas(modal.submitForm(), edit)
        );
        modalRef.close();
        this.recipes = await lastValueFrom(this.recetaService.getRecetas());
        this.datosTabla = this.recipes;
      }else{ 
        for (const i in modal.validateForm.controls) {
          if (modal.validateForm.controls.hasOwnProperty(i)) {
            modal.validateForm.controls[i].markAsDirty();
            modal.validateForm.controls[i].updateValueAndValidity();
          }
        }
      }
    } catch (err) {
      console.error('Error updating familias', err);
    }
  }

  showModal(item: Receta | undefined): void {
    const footer: Array<ModalButtonOptions<FormRecetaComponent>> = [
      {
        label: 'Cancelar',
        type: 'text',
        danger: false,
        onClick: () => modalRef.destroy(),
      },
      {
        label: item? 'Editar' : 'Cargar',
        type: 'primary',
        danger: false,
        onClick: async () => {
          this.modal.confirm({ 
            nzCentered: true,
            nzTitle: 'Confirmar '+(item?'edicion?':'guardado?'), 
            nzOnOk: ()=> this.onSubmit(!!item,modalRef.getContentComponent() as FormRecetaComponent, modalRef),
            nzOkText: item?"Editar":"Guardar",
            nzCancelText:"Cancelar"
          })
        }
      }
    ]

    if(item)
      footer.push({
        label: 'Eliminar',
        type: 'primary',
        danger: true,
        onClick: async () => {
          this.modal.warning({ 
            nzCentered: true,
            nzTitle: 'Eliminar Receta?', 
            nzOnOk: ()=> this.onDelete(item.id, modalRef),
            nzOkText: 'Eliminar',
            nzCancelText:"Cancelar"
          })
        }
                
      })
    const modalRef: NzModalRef = this.modal.create<FormRecetaComponent, Receta | undefined>({
      nzTitle: item? 'Editar Receta' : 'Cargar Receta',
      nzContent: FormRecetaComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzWidth: 750,
      nzFooter:footer
    })
    if(item)
      modalRef.componentInstance.patchFormValues(item);
  }
}
