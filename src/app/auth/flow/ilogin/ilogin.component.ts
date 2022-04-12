import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  //on form submit
  loginUser() {
    console.log(this.ilogin.value);
  }

}
