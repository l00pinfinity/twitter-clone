import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IloginComponent } from './auth/flow/ilogin/ilogin.component';
import { IsignupComponent } from './auth/flow/isignup/isignup.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard'; 

const routes: Routes = [
  { path: '', component: SignupComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'explore', component: ExploreComponent, pathMatch: 'full' },
  { path: 'i/flow/signup', component: IsignupComponent, pathMatch: 'full' },
  { path: 'i/flow/login', component: IloginComponent, pathMatch: 'full' },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
