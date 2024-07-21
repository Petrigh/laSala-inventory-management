import { Routes } from '@angular/router';
import { authGuard } from '../../../services/guards/auth.guard';
import { StockInsumosComponent } from './stock-insumos.component';

export const INSUMOS_ROUTES: Routes = [
  { path: '', component: StockInsumosComponent, canActivate: [authGuard] },
];
