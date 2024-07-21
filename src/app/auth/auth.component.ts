import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form!: FormGroup;
  public email : string = '';
  public password : string = '';
  constructor() { }

  ngOnInit(): void {
    let email: string ='';
    let password: string = '';
    this.form = new FormGroup({
      title: new FormControl(this.email, [Validators.required , Validators.email]),
      description: new FormControl(this.password, [Validators.required]),
    });
  }

  onLogin()
  {

  }

}
