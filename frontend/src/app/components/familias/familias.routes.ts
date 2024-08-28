import { Routes } from '@angular/router';
import { FamiliasComponent } from './familias.component';
import { authGuard } from '../../services/guards/auth.guard';
import { priviledgeGuard } from '../../services/guards/priviledge.guard';

export const FAMILIAS_ROUTES: Routes = [
  { path: '', component: FamiliasComponent, canActivate: [authGuard, priviledgeGuard] },
];
