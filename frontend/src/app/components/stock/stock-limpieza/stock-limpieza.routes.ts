import { Routes } from '@angular/router';
import { authGuard } from '../../../services/guards/auth.guard';
import { StockLimpiezaComponent } from './stock-limpieza.component';

export const LIMPIEZA_ROUTES: Routes = [
  { path: '', component: StockLimpiezaComponent, canActivate: [authGuard] },
];
