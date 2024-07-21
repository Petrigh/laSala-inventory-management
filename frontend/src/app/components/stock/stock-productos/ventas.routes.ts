import { Routes } from '@angular/router';
import { authGuard } from '../../../services/guards/auth.guard';
import { StockProductosComponent } from './stock-productos.component';

export const PRODUCTOSS_ROUTES: Routes = [
  { path: '', component: StockProductosComponent, canActivate: [authGuard] },
];
