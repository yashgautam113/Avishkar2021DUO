import { Component, OnInit, Input } from '@angular/core';
// import { userInfo } from 'os';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { DisplayService } from 'src/app/services/display.service';
@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
  })

  export class DisplayComponent implements OnInit {

    @Input() user : any;
    @Input() index: any;
    buttonClicked = false;
    i = 1;
    id2: string;
    Obs : Observable<any>
    constructor(private http: HttpClient, private cookieService: CookieService,
        private displayService: DisplayService){}
    ngOnInit(){
       const id2 = this.user._id;
       this.id2 = id2;
    }
    AUTH_API = 'http://localhost:3000/';
    onsubmit(){
            this.buttonClicked = true;
            
            this.Obs = this.displayService.like(this.id2)
            this.Obs.subscribe(resData=>{
                console.log('33',resData);
            },e=>{
                console.log('35',e)
            })
    }
  }