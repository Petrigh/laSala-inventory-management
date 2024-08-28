import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FamilaProductora } from './models/FamiliaProductora';
import { faPencil, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../services/user.service';
import { ModalButtonOptions, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FamiliaService } from './services/familia.service';
import { FormFamiliaComponent } from './form-familia/form-familia.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-familias',
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
  templateUrl: './familias.component.html',
  styleUrl: './familias.component.css'
})
export class FamiliasComponent implements OnInit{

  addIcon = faPlus;
  buscarIcon = faSearch;
  editIcon = faPencil;

  familias: FamilaProductora[] = [];
  datosTabla: FamilaProductora[] = [];
  isAdmin: boolean = false;

  searchValue = '';
  visible = false;

  constructor(
    private userService: UserService,
    private familiaService: FamiliaService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ){}

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(
      (admin) => {
        this.isAdmin = admin;
      }
    );
    this.familiaService.getFamilias().subscribe(
      (familias)=> {
        this.familias = familias;
        this.datosTabla = familias;
      }
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.datosTabla = this.familias.filter((item: FamilaProductora) => (item.nombre.toLocaleUpperCase().indexOf(this.searchValue.toLocaleUpperCase()) !== -1));
  }

  async onDelete(flia: number, modalRef: NzModalRef){
    await lastValueFrom(
      this.familiaService.deleteFamilia(flia)
    );
    modalRef.close();
    this.familias = await lastValueFrom(this.familiaService.getFamilias());
    this.datosTabla = this.familias;
  }

  async onSubmit(edit: boolean, modal: FormFamiliaComponent, modalRef: NzModalRef)
  {
    try {
      if (modal.validateForm.valid) {
        await lastValueFrom(
          this.familiaService.updateFamilias(modal.submitForm(), edit)
        );
        modalRef.close();
        this.familias = await lastValueFrom(this.familiaService.getFamilias());
        this.datosTabla = this.familias;
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

  showModal(item: FamilaProductora | undefined): void {
    const footer: Array<ModalButtonOptions<FormFamiliaComponent>> = [
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
            nzOnOk: ()=> this.onSubmit(!!item,modalRef.getContentComponent() as FormFamiliaComponent, modalRef),
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
            nzTitle: 'Eliminar Familia Productora?', 
            nzOnOk: ()=> this.onDelete(item.id, modalRef),
            nzOkText: 'Eliminar',
            nzCancelText:"Cancelar"
          })
        }
                
      })
    const modalRef: NzModalRef = this.modal.create<FormFamiliaComponent, FamilaProductora | undefined>({
      nzTitle: item? 'Editar Familia Productora' : 'Cargar Familia Productora',
      nzContent: FormFamiliaComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzWidth: 350,
      nzFooter:footer
    })
    if(item)
      modalRef.componentInstance.patchFormValues(item);
  }

}
