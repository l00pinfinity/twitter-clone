import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ilogin',
  templateUrl: './ilogin.component.html',
  styleUrls: ['./ilogin.component.scss']
})
export class IloginComponent implements OnInit {

  ilogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  //on form submit
  loginUser() {
    console.log(this.ilogin.value);
    this.http.post<any>(environment.apiUrl+'/auth/users',this.ilogin.value).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.router.navigate(['/home']);
      }
    },err=>{
      console.log(err);
    });
  }

}
