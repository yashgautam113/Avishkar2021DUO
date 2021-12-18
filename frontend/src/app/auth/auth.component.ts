import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService,
                private router: Router) {}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm){
        if(!form.valid) {
          return;
        }
        
        const email = form.value.email;
        // console.log(email);
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>
        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }
        else{
            authObs = this.authService.signup(email, password);
        }
        console.log(authObs)
        authObs.subscribe(resData =>{
            // console.log('line40');
            console.log(resData);
            this.isLoading = false;
            // console.log('46')
            this.router.navigate(['/home']);
          }, error =>{
            console.log(error);
            // this.error = error.error.error.message,
            this.isLoading = false;
          });
          
        form.reset();
    }
}

