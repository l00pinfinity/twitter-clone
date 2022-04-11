import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TrendsComponent } from './components/trends/trends.component';
import { AuthmoduleModule } from './auth/authmodule/authmodule.module';
import { TweetsComponent } from './components/tweets/tweets.component';
import { ComposeTweetComponent } from './components/compose-tweet/compose-tweet.component';
import { ExploreComponent } from './components/explore/explore.component';
import { IloginComponent } from './auth/flow/ilogin/ilogin.component';
import { IsignupComponent } from './auth/flow/isignup/isignup.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    TrendsComponent,
    TweetsComponent,
    ComposeTweetComponent,
    ExploreComponent,
    IloginComponent,
    IsignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthmoduleModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
