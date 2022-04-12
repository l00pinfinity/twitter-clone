import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  signinUser(){
    console.log(this.isignup.value);
  }

}
