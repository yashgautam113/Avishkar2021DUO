import { Component, OnInit } from "@angular/core";
import { User } from "src/app/services/user.model";
// import { FeedService } from "src/app/services/feed.service";
import { BehaviorSubject, interval, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: 'app-feed',
    templateUrl : './feed.component.html',
    styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit{
     filteredUsers: {};
     imageToShow : any;
    //  arr : any[];  
    constructor( 
        private http: HttpClient, private authService: AuthService,
        private cookieService: CookieService) {}
    AUTH_API = "http://localhost:3000/";
    ngOnInit() {
        console.log('30',this.authService.savedUser._token)
        
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
             'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            'Content-Type': 'data.img.contentType',
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'withCredentials' : 'true',
            
            'observe' : 'response',
            'Token' : this.cookieService.get('Token')
        });
        let options = { headers: headers };
        console.log('21');
        this.http.get( this.AUTH_API + 'usersList',
        options
        //   httpOptions
        ).subscribe(data =>{
            console.log('26',data)
            // let x = this.str2ab(data[0]);
            // console.log('45',x);
            // this.createImageFromBlob(x);
            this.filteredUsers = data;
            // console.log('25',this.filteredUsers[1].avatar)
        },error =>{
            console.log('29',error) 

        })
        console.log('32')
//     Object.keys(this.filteredUsers).map(function(key){  
//     this.arr.push({[key]:this.filteredUsers[key]})  
//     console.log('28',this.arr) ;  

// });  
    }
    

    
    
}