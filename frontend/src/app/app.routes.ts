import { Routes } from '@angular/router';
import { LOGIN_ROUTES } from './components/login/login.routes';

export const routes: Routes = [
    { path: 'login', loadChildren:() => import('./components/login/login.routes').then(m => LOGIN_ROUTES) },
    { path: 'welcome', loadChildren: () => import('./components/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
    { path: 'recetas', loadChildren: () => import('./components/recetas/recetas.routes').then(m => m.RECETAS_ROUTES) },
    { path: 'familias', loadChildren: () => import('./components/familias/familias.routes').then(m => m.FAMILIAS_ROUTES) },
    { path: 'canales', loadChildren: () => import('./components/canales/canales.routes').then(m => m.CANALES_ROUTES) },
    { path: 'colaboradorxs', loadChildren: () => import('./components/colaboradorxs/colaboradorxs.routes').then(m => m.COLABORADORXS_ROUTES) },
    { path: 'insumos', loadChildren: () => import('./components/stock/stock-insumos/stock-insumos.routes').then(m => m.INSUMOS_ROUTES) },
    { path: 'limpieza', loadChildren: () => import('./components/stock/stock-limpieza/stock-limpieza.routes').then(m => m.LIMPIEZA_ROUTES) },
    { path: 'productos', loadChildren: () => import('./components/stock/stock-productos/ventas.routes').then(m => m.PRODUCTOSS_ROUTES) },
    { path: '**', pathMatch: 'full', redirectTo: '/welcome' }
  ];
