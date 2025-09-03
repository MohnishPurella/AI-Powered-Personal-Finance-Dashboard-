import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { authSignal } from '../../../signals/auth.signal';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, CardModule, RouterModule, Toast, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{

  loginFormGroup!: FormGroup;
  errorMessage = '';
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ){
    this.buildLoginForm();
  }

  ngOnInit( ) { }

  buildLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.isFormSubmitted = true;
    if(this.loginFormGroup.invalid){
      this.showError();
      return; 
    }
    const { userName, password } = this.loginFormGroup.value;
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

  get formField(){
    return this.loginFormGroup.controls;
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Enter Required Fields' });
  }
}
