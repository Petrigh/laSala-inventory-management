import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { ModalButtonOptions, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Canal, Channel, Ubicacion } from './models/Canal';
import { UserService } from '../../services/user.service';
import { CanalService } from './services/canal.service';
import { FormCanalComponent } from './form-canal/form-canal.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-canales',
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
  templateUrl: './canales.component.html',
  styleUrl: './canales.component.css'
})
export class CanalesComponent implements OnInit{

  addIcon = faPlus;
  buscarIcon = faSearch;
  editIcon = faPencil;

  canales: Channel[] = [];
  datosTabla: Channel[] = [];
  isAdmin: boolean = false;
  ubicacion = Ubicacion;

  searchValue = '';
  visible = false;

  constructor(
    private userService: UserService,
    private canalService: CanalService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ){}

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(
      (admin) => {
        this.isAdmin = admin;
      }
    );
    this.canalService.getCanales().subscribe(
      (canales) => {
        this.canales = canales;
        this.datosTabla = canales;
      }
    )
  }

  tipoCheck(tipo:Ubicacion){
    switch(tipo.toString()){
      case 'WEB':
        return 0;
      case 'FISICO':
        return 1;
      default:
        return 1;
    }
  }

  getFullUrl(url: string): string {
    if (!/^https?:\/\//i.test(url)) {
      return 'http://' + url;
    }
    return url;
  }
  

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.datosTabla = this.canales.filter((item: Canal) => (item.nombre.toLocaleUpperCase().indexOf(this.searchValue.toLocaleUpperCase()) !== -1));
  }  

  async onDelete(canal: number, modalRef: NzModalRef){
    await lastValueFrom(
      this.canalService.deleteCanal(canal)
    );
    modalRef.close();
    this.canales = await lastValueFrom(this.canalService.getCanales());
    this.datosTabla = this.canales;
  }

  async onSubmit(edit: boolean, modal: FormCanalComponent, modalRef: NzModalRef)
  {
    try {
      if (modal.validateForm.valid) {
        await lastValueFrom(
          this.canalService.updateCanals(modal.submitForm(), edit)
        );
        modalRef.close();
        this.canales = await lastValueFrom(this.canalService.getCanales());
        this.datosTabla = this.canales;
      }else{ 
        for (const i in modal.validateForm.controls) {
          if (modal.validateForm.controls.hasOwnProperty(i)) {
            modal.validateForm.controls[i].markAsDirty();
            modal.validateForm.controls[i].updateValueAndValidity();
          }
        }
      }
    } catch (err) {
      console.error('Error updating canales', err);
    }
  }
  
  showModal(item: Canal | undefined): void {
    const footer: Array<ModalButtonOptions<FormCanalComponent>> = [
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
            nzOnOk: ()=> this.onSubmit(!!item,modalRef.getContentComponent() as FormCanalComponent, modalRef),
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
            nzTitle: 'Eliminar Canal?', 
            nzOnOk: ()=> this.onDelete(item.id, modalRef),
            nzOkText: 'Eliminar',
            nzCancelText:"Cancelar"
          })
        }
                
      })
    const modalRef: NzModalRef = this.modal.create<FormCanalComponent, Canal | undefined>({
      nzTitle: item? 'Editar Canal' : 'Cargar Canal',
      nzContent: FormCanalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzWidth: 350,
      nzFooter:footer
    })
    if(item)
      modalRef.componentInstance.patchFormValues(item);
  }

}
