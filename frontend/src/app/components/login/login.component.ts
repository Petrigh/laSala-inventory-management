import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService } from '../../services/user.service';
import { Credentials } from '../../shared/credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule
  ]
})
export class LoginComponent implements OnInit {

  credentials: Credentials | undefined;
  userValidated: string = "";
  errorMessage: string = "";
  disableIngresar: boolean = false;

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });
  
  constructor(
    private fb: NonNullableFormBuilder, 
    private userService: UserService,
    private router: Router
  ) {}


  ngOnInit() { 
    this.userService.isLoggedIn$.subscribe(
      (loggedIn) => {
        if(loggedIn){
          this.router.navigate(['/welcome']);
        }
      }
    );
  }

  submitForm(): void {
    this.disableIngresar = true;
    if (this.validateForm.valid) {
      this.credentials = new Credentials({
        usuario: this.validateForm.get("userName")?.value,
        password: this.validateForm.get("password")?.value,
      });
      this.userService.login(this.credentials).subscribe(
        (response) => {
          this.router.navigate(['/welcome']);
          this.disableIngresar = false;
        },
        (error) => {
          this.userValidated = "error"
          this.errorMessage = error.message;
          this.disableIngresar = false;
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.disableIngresar = false;
    }
  }

}
