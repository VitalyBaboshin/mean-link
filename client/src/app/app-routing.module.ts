import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./shared/pages/auth/auth.component";
import {CreateComponent} from "./shared/pages/create/create.component";
import {DetailComponent} from "./shared/pages/detail/detail.component";
import {LinksComponent} from "./shared/pages/links/links.component";
import {AuthGuard} from "./shared/classes/auth.guard";


const routes: Routes = [

  {path: '', redirectTo: "/auth", pathMatch: 'full'},
  {path: '', children: [
      {path: 'auth', component: AuthComponent,pathMatch: 'full'},
      {path: 'create', component: CreateComponent,canActivateChild: [AuthGuard], pathMatch: 'full'},
      {path: 'detail/:id', component: DetailComponent,canActivateChild: [AuthGuard], pathMatch: 'full'},
      {path: 'links', component: LinksComponent,canActivateChild: [AuthGuard], pathMatch: 'full'},
      { path: '**', redirectTo: '/auth' }
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
