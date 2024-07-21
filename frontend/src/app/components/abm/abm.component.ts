import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faPencil, faX } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { DataItem } from './models/dataItems';

@Component({
  selector: 'app-abm',
  standalone: true,
  imports: [
    NgIf, NgFor,
    FormsModule,
    NzTableModule,
    NzDropdownMenuComponent,
    FontAwesomeModule,
    NzButtonModule,
  ],
  templateUrl: './abm.component.html',
  styleUrl: './abm.component.css'
})
export class AbmComponent implements OnInit, OnChanges{
  
  @Input() importedData: Array<any> = [];
  @Input() title: string = '';
  @Input() buttonAddText: string = '';
  @Input() isEditable: boolean = false;
  @Input() pageSize: number = 7;
  @Output() addTrigger = new EventEmitter(); 

  addIcon = faPlus;
  buscarIcon = faSearch;
  editIcon = faPencil;
  eliminarIcon = faX;
  isAdmin: boolean = false;
  
  //Tabla
  searchValue = '';
  visible = false;
  datosTabla: Array<any> = [];
  headerTabla: Array<string> = [];
  colsBusqueda = ['NOMBRE', 'NROVENTA'];

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(
      (admin) => {
        this.isAdmin = admin;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['importedData']){
      this.headerTabla = Object.keys(this.importedData[0]).map((key) => key.toUpperCase());
      this.datosTabla = this.importedData
    }
  }

  convertKeysToUppercase(obj: any): void {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const upperKey = key.toUpperCase();
        newObj[upperKey] = obj[key];
      }
    }
    return newObj;
  }

  headerDeInteres(header: string): boolean{
    if(this.colsBusqueda.includes(header))
      return true;
    return false;

  }

  getItemValue(item: any, header: string): string { 
    item = this.convertKeysToUppercase(item);
    if (header in item) {
      if (item[header] instanceof Date) {
        return new Date(item[header]).toLocaleDateString();
      }
      return item[header].toString();
    }
    return '----';
  }


  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    
    this.datosTabla = this.importedData.filter(<T extends DataItem>(item: T) => item.nombre.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
  }

  openAddForm(){
    this.addTrigger.emit();
  }
}