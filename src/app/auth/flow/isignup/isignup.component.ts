import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-isignup',
  templateUrl: './isignup.component.html',
  styleUrls: ['./isignup.component.scss']
})
export class IsignupComponent implements OnInit {

  isSuccessul = false;
  errorMessage!: string;

  isignup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    name: new UntypedFormControl('', [Validators.required]),
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    //console.log(this.isignup.value);
    this.http.post<any>(environment.apiUrl+'/api/auth/signup',this.isignup.value).subscribe(res=>{
      //console.log(res);
      if(res.success == true){
        this.isSuccessul = true;
        this.router.navigate(['/i/flow/login']);
      }
    },(err:Error | HttpErrorResponse)=>{
      this.errorMessage = err.message;
    })
  }

}
