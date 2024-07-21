import { Routes } from '@angular/router';
import { ActividadesComponent } from './actividades.component';
import { authGuard } from '../../services/guards/auth.guard';

export const RECETAS_ROUTES: Routes = [
  { path: '', component: ActividadesComponent, canActivate: [authGuard] },
];
