import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select'
import { Colaboradores, User } from '../models/colaboradorxs';
import { ColaboradoresService } from '../services/colaboradores.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [
    NzModalModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzTableModule,
    NzSelectModule,
    NzCheckboxModule
  ],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent implements OnInit{

  usuario: User = new User(null);
  validateForm: FormGroup;
  edit: boolean = false;
  roles: Array<string> = [];

  constructor(private fb: FormBuilder,
    private colService: ColaboradoresService
  ) {
    this.validateForm = this.fb.group({
      id: [null],
      usuario: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      salt: [null],
      active: [true],
      rol: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.colService.getRolesColabs().subscribe(
      (roles) => 
        this.roles = roles
    );
  }

  patchFormValues(input: Colaboradores){
    if(input){
      this.usuario = input;
      this.edit = true;
      this.validateForm.patchValue(this.usuario);
      this.validateForm.get('password')?.patchValue(this.usuario.password.substring(0,7));
    }
  }
  
  submitForm(): User {
    let usr = new User(this.validateForm.getRawValue());
    if(this.edit){
      if(usr.password == this.usuario?.password.substring(0,7)){
        usr.password = this.usuario.password;
      }
    }
    return usr;
  }
}