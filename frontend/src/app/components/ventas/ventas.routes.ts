import { Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { authGuard } from '../../services/guards/auth.guard';
import { priviledgeGuard } from '../../services/guards/priviledge.guard';

export const VENTAS_ROUTES: Routes = [
  { path: '', component: VentasComponent, canActivate: [authGuard, priviledgeGuard] },
];
