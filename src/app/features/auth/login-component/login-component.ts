import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { authSignal } from '../../../signals/auth.signal';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, CardModule, HttpClientModule, RouterModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent implements OnInit{

  loginFormGroup!: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const { userName, password } = this.loginFormGroup.value;
    console.log(userName + ' - ' + password);
    this.http
      .get<any[]>(`http://localhost:3000/users?username=${userName}&password=${password}`)
      .subscribe((users) => {        
        if (users.length) {
          authSignal.set(users[0]);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      });
  }
}
