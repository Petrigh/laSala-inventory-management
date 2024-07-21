import { Routes } from '@angular/router';
import { RecetasComponent } from './recetas.component';
import { authGuard } from '../../services/guards/auth.guard';

export const RECETAS_ROUTES: Routes = [
  { path: '', component: RecetasComponent, canActivate: [authGuard] },
];
