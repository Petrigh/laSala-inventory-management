import { Routes } from '@angular/router';
import { authGuard } from '../../services/guards/auth.guard';
import { priviledgeGuard } from '../../services/guards/priviledge.guard';
import { CanalesComponent } from './canales.component';

export const CANALES_ROUTES: Routes = [
    { path: '', component: CanalesComponent, canActivate: [authGuard, priviledgeGuard] },
  ];
  