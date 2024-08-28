import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Colaboradores, User } from './models/colaboradorxs';
import { ColaboradoresService } from './services/colaboradores.service';
import { lastValueFrom, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { faPencil, faPlus, faSearch, faUserCheck, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormUsuarioComponent } from './formUsuario/form-usuario.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradorxs',
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
  templateUrl: './colaboradorxs.component.html',
  styleUrl: './colaboradorxs.component.css'
})
export class ColaboradorxsComponent {
  //icons
  addIcon = faPlus;
  buscarIcon = faSearch;
  editIcon = faPencil;
  userActive = faUserCheck;
  userInactive = faUserLock;

  //tabla
  listColab: Colaboradores[] = [];
  datosTabla: Colaboradores[] = [];
  isAdmin: boolean = false;

  //buscador
  searchValue = '';
  visible = false;

  //modal
  nzOk: boolean = false;

  constructor(
    private colabService: ColaboradoresService,
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
    this.colabService.getUsuarios().subscribe(
      (colabs)=> {
        this.listColab = colabs;
        this.datosTabla = colabs;
      }
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    
    this.datosTabla = this.listColab.filter((item: Colaboradores) => (item.nombre.toLocaleUpperCase().indexOf(this.searchValue.toLocaleUpperCase()) !== -1) || (item.apellido.toLocaleUpperCase().indexOf(this.searchValue.toLocaleUpperCase()) !== -1));
  }

  async onSubmit(edit: boolean, modal: FormUsuarioComponent, modalRef: NzModalRef)
  {
    try {
      if (modal.validateForm.valid) {
        await lastValueFrom(
          this.colabService.updateUsers(modal.submitForm(), edit)
        );
        modalRef.close();
        this.listColab = await lastValueFrom(this.colabService.getUsuarios());
        this.datosTabla = this.listColab;
      }else{ 
        for (const i in modal.validateForm.controls) {
          if (modal.validateForm.controls.hasOwnProperty(i)) {
            modal.validateForm.controls[i].markAsDirty();
            modal.validateForm.controls[i].updateValueAndValidity();
          }
        }
      }
    } catch (err) {
      console.error('Error updating user', err);
    }
  }

  showModal(item: Colaboradores | undefined): void {  
    const modalRef: NzModalRef = this.modal.create<FormUsuarioComponent, Colaboradores | undefined>({
      nzTitle: item? 'Editar Usuario' : 'Cargar Usuario',
      nzContent: FormUsuarioComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzFooter:[
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
              nzOnOk: ()=> this.onSubmit(!!item,modalRef.getContentComponent() as FormUsuarioComponent, modalRef),
              nzOkText: item?"Editar":"Guardar",
              nzCancelText:"Cancelar"
            })
          }
        }
      ]
    })
    if(item)
      modalRef.componentInstance.patchFormValues(item);
  }
}
