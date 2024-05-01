import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ilogin',
  templateUrl: './ilogin.component.html',
  styleUrls: ['./ilogin.component.scss']
})
export class IloginComponent implements OnInit {

  isLoggedIn = false;
  errorMessage!: string;

  ilogin = new UntypedFormGroup({
    usernameOrEmail: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private http:HttpClient,private router:Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  //on form submit
  loginUser() {
    //console.log(this.ilogin.value);
    this.http.post<any>(environment.apiUrl+'/api/auth/signin',this.ilogin.value).subscribe(res=>{
      //console.log(res);
      if(res){
        this.tokenStorage.setSession(res);
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      }
    },()=>{
      this.errorMessage = "Something went wrong, please try again."
    });
  }

}
