import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login-component/login-component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', loadComponent: () => import('./features/dashboard-component/dashboard-component').then(m => m.DashboardComponent) },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
