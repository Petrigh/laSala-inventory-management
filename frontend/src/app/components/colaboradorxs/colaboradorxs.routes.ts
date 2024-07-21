import { Routes } from '@angular/router';
import { ColaboradorxsComponent } from './colaboradorxs.component';
import { authGuard } from '../../services/guards/auth.guard';
import { priviledgeGuard } from '../../services/guards/priviledge.guard';

export const COLABORADORXS_ROUTES: Routes = [
  { path: '', component: ColaboradorxsComponent, canActivate: [authGuard, priviledgeGuard] },
];
