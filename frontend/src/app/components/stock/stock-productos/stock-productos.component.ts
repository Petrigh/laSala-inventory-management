import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Stockervice } from '../services/stock.service';
import { Type } from '../../recetas/models/recetas';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faPencil } from '@fortawesome/free-solid-svg-icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalModule, NzModalService, NzModalRef, ModalButtonOptions } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { FormStockComponent } from '../form-stock/form-stock.component';
import { BienStock } from '../models/stocks';

@Component({
  selector: 'app-stock-productos',
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
  templateUrl: './stock-productos.component.html',
  styleUrl: './stock-productos.component.css'
})
export class StockProductosComponent implements OnInit{
  addIcon = faPlus;
  buscarIcon = faSearch;
  editIcon = faPencil;

  listProductos: BienStock[] = [];
  datosTabla: BienStock[] = [];
  isAdmin: boolean = false;

  searchValue = '';
  visible = false;

  constructor(
    private stockService: Stockervice,
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
    this.stockService.getProductos().subscribe((insumos) => {
        this.listProductos = insumos;
        this.datosTabla = insumos;
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.datosTabla = this.listProductos.filter((item: BienStock) => (item.nombre.toLocaleUpperCase().indexOf(this.searchValue.toLocaleUpperCase()) !== -1));
  }

  async onSubmit(edit: boolean, modal: FormStockComponent, modalRef: NzModalRef)
  {
    try {
      if (modal.validateForm.valid) {
        await lastValueFrom(
          this.stockService.updateBien(modal.submitForm(), edit)
        );
        modalRef.close();
        this.listProductos = await lastValueFrom(this.stockService.getProductos());
        this.datosTabla = this.listProductos;
      }else{ 
        for (const i in modal.validateForm.controls) {
          if (modal.validateForm.controls.hasOwnProperty(i)) {
            modal.validateForm.controls[i].markAsDirty();
            modal.validateForm.controls[i].updateValueAndValidity();
          }
        }
      }
    } catch (err) {
      console.error('Error updating Producots', err);
    }
  }

  showModal(item: BienStock | undefined): void {
    const footer: Array<ModalButtonOptions<FormStockComponent>> = [
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
            nzOnOk: ()=> this.onSubmit(!!item,modalRef.getContentComponent() as FormStockComponent, modalRef),
            nzOkText: item?"Editar":"Guardar",
            nzCancelText:"Cancelar"
          })
        }
      }
    ]

    const modalRef: NzModalRef = this.modal.create<FormStockComponent, BienStock | undefined>({
      nzTitle: item? 'Editar Producto' : 'Cargar Producto',
      nzContent: FormStockComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzCentered: true,
      nzWidth: 350,
      nzFooter:footer
    })
    if(item)
      modalRef.componentInstance.patchFormValues(item);
    modalRef.componentInstance.setType(Type.PRODUCTO);
  }

}
