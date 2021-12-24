import { Component, OnInit } from "@angular/core";
import {io} from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
    selector: 'app-chat-inbox',
    templateUrl: './chat-inbox.component.html',
    styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit{
    socket;
    message: string;
    
    constructor(){ }
    ngOnInit(){
        this.setupSocketConnection();
        console.log('13')
    }

    // Testing fn

    // SendMessage() {
    //     this.socket.emit('message', this.message);
    //     this.message = '';
    //  }

    SendMessage() {
        this.socket.emit('message', this.message);
        const element = document.createElement('li');
        element.innerHTML = this.message;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        element.style.textAlign = 'right';
        document.getElementById('message-list').appendChild(element);
        this.message = '';
     }

    //  Testing function

    // setupSocketConnection(){
    //     this.socket = io(SOCKET_ENDPOINT);
    // }

    setupSocketConnection() {
        this.socket = io(SOCKET_ENDPOINT);
        this.socket.on('message-broadcast', (data: string) => {
        if (data) {
         const element = document.createElement('li');
         element.innerHTML = data;
         element.style.background = 'white';
         element.style.padding =  '15px 30px';
         element.style.margin = '10px';
         document.getElementById('message-list').appendChild(element);
         }
       });
     }
}