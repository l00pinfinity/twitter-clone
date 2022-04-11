import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IloginComponent } from './auth/flow/ilogin/ilogin.component';
import { IsignupComponent } from './auth/flow/isignup/isignup.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'signup', component: SignupComponent, pathMatch:'full'},
  {path: 'home',component: HomeComponent, pathMatch: 'full'},
  {path: 'explore',component:ExploreComponent, pathMatch: 'full'},

  {path:'i/flow/signup',component:IsignupComponent, pathMatch: 'full'},
  {path:'i/flow/login',component:IloginComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
