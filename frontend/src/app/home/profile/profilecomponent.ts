import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { PhotoService } from "src/app/services/photo.service";
import { CookieService } from "ngx-cookie-service";
// import {Http, Headers, RequestOptionsArgs } from "@angular/http";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', './demo.css', './style.css']
})

export class ProfileComponent implements OnInit {
    [x: string]: any;
constructor(private authService: AuthService, private router: Router,
    private http : HttpClient , private photoService: PhotoService,
    private cookieService: CookieService) {}
    authObs: Observable<AuthResponseData>
    user: any;
    // photograph :any;
    imageToShow : any;
    onlogout(){
        this.authObs = this.authService.logout();
        console.log('16',this.authObs)
        this.authObs.subscribe(resData=>{
            this.router.navigate(['/auth']);
        },error=>{
            console.log(error)
        })
    }
    AUTH_API = "http://localhost:3000/";

    ngOnInit(){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'withCredentials' : 'true',
            'observe' : 'response',
            'Token' : this.cookieService.get('Token')
        });
        let options = { headers: headers };
        console.log('38');
        this.http.get( this.AUTH_API + 'profile',
    options
        
        //   httpOptions
        ).subscribe(data =>{
            console.log('43',data)
            this.user = data;
            console.log('45')
        },error =>{
            console.log('47',error) 

        });
        console.log('50');

        headers = new HttpHeaders({
            // 'Content-type': 'image/jpg',
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'withCredentials' : 'true',
            'observe' : 'response',
            'Token' : this.authService.savedUser._token
        });

        this.http.get( this.AUTH_API + 'avatar',
        { headers: headers 
            , responseType :'blob'
        }
        //   httpOptions
        ).subscribe(data =>{
            console.log('60',data)
            // let blob = new Blob(data['_body'], {type: 'image/jpg'});
            // let url = URL.createObjectURL(blob);
           this.createImageFromBlob(data);
        //    this.imageToShow = data
            // console.log('73',blob)
            console.log('62')
        },error =>{
            console.log('64',error) 
        })
     
        this.router.navigate(['/profile'])
    }
    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
           this.imageToShow = reader.result;
           console.log(this.imageToShow);
        }, false);
   
        if (image) {
           reader.readAsDataURL(image);
        //    console.log(reader);
        }
     } 

    onSubmit(form: NgForm){
        console.log('58',form.value.photo);
        let Obs : Observable<any>;
        Obs = this.photoService.phtoedit(form);
        Obs.subscribe(resData=>{
            console.log('63',resData)
        },e=>{
            console.log('65',e);
        })
    }

} 