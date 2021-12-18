import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from  'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from "@angular/common/http";
export interface AuthResponseData {
    kind: string;
    user: any;
    token: string;
    email: string;
    refreshToekn: string;
    expiresIn: string;
    localId: string;
    resgistered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService{
    user = new BehaviorSubject<User>(null);
    token: string = null;
    AUTH_API = 'http://localhost:3000/'
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router, private cookieService : CookieService){}
    // savedUser : any;
    


    signup(email: string, password: string){
        // let headers = new Headers();
        // headers.append('Content-Type','application/json');
        // // headers.append('Authorization',this.basic);
        // let options = new RequestOptions({headers:headers});

        // HEADERS
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'withCredentials' : 'true'
    });
    let options = { headers: headers };
        // console.log('line27', email);
         return this.http.post<AuthResponseData>(
             this.AUTH_API + 'signup',
            {
                email: email,
                password: password,
                returnSecureToken: true 
            }, 
         options
        ).pipe(
            catchError(throwError),
            tap(resData =>{
                console.log(resData);
            this.handleAuthentication(resData.email,resData.localId,resData.token,
                +resData.expiresIn)
        }))
    } 

    login(email: string, password: string){

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials' : 'true',
           'Access-Control-Allow-Origin': 'http://localhost:4200',
           'withCredentials' : 'true',
           'observe' : 'response'
        });
        let options = { headers: headers };
        return this.http.post<AuthResponseData>(
            this.AUTH_API + 'login',
            {
                email: email,
                password: password,
                returnSecureToken : true
            }, options
        ).pipe(tap(resData =>{
            console.log('80', resData.email);
            this.handleAuthentication(resData.email,resData.localId,resData.token,
                +resData.expiresIn)
                // this.cookieService.set('Token', resData.token)
        }))
    }  


    autologin(){
        const userData :{
            email: string;
            id: string;
            _token : string;
            _tokenExpirationDate : string;

        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) return;
        console.log('100',userData.email)
        const loadedUser = new User(userData.email, 
                                    userData.id, 
                                    userData._token, 
                                    new Date(userData._tokenExpirationDate));
            console.log('105', loadedUser._token)
        if(loadedUser._token){
            console.log('107',loadedUser);
            this.user.next(loadedUser)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autologout(expirationDuration);
            console.log('109',this.user)
            // manually set data in expirationDuration argument to verify
        }
    }


    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);

        // clear localSTorage
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }


    autologout(expirationDuration : number){
        this.tokenExpirationTimer = setTimeout(() =>{
            this.logout()
        }, expirationDuration)
    }

    private handleAuthentication(email: string, userId: string, token : string, expiresIn: number){
        console.log('135',email);
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate 
        );
        this.user.next(user);
            console.log('97',user);
        //  To save user data in case of reloading
        // console.log('86',resData);
        localStorage.setItem('userData', JSON.stringify(user));
        // this.cookieService.set('Token', '1234')
    }


    


}