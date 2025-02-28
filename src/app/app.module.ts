import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TrendsComponent } from './components/trends/trends.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { ComposeTweetComponent } from './components/compose-tweet/compose-tweet.component';
import { ExploreComponent } from './components/explore/explore.component';
import { IloginComponent } from './auth/flow/ilogin/ilogin.component';
import { IsignupComponent } from './auth/flow/isignup/isignup.component';
import { TokenInterceptorInterceptor } from './services/interceptor/token-interceptor.interceptor';
import { DateAgoPipe } from './services/pipe/date-ago.pipe';
import { environment } from 'src/environments/environment';

export function initializeFirebaseApp(): FirebaseApp {
    return initializeApp(environment.firebaseConfig);
  }

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
        DateAgoPipe
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,AppRoutingModule,ReactiveFormsModule], 
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }, 
        provideHttpClient(withInterceptorsFromDi()),
        provideFirebaseApp(() => initializeFirebaseApp()),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideMessaging(() => getMessaging()),
        providePerformance(() => getPerformance()),
    ]
})
export class AppModule { }
