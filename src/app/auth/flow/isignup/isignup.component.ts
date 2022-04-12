import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-isignup',
  templateUrl: './isignup.component.html',
  styleUrls: ['./isignup.component.scss']
})
export class IsignupComponent implements OnInit {
  isignup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log(this.isignup.value);
    this.http.post<any>(environment.apiUrl+'/auth/signup',this.isignup.value).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.router.navigate(['/i/flow/login']);
      }
    },err=>{
      console.log(err);
    })
  }

}
