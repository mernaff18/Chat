import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard'
const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'home',canActivate: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
