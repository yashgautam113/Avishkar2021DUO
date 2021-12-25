import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ChatInboxComponent } from "../chat-inbox.component";

import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
    selector: 'app-chat-data',
    templateUrl: './chat-data.component.html',
    styleUrls: ['/chat-data.component.css']
})
export class ChatDataComponent implements OnInit {
    // @Input() room: any;
    room: any;
    socket;
    message: string;
    // room: any;
    id: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private chatInboxComponent: ChatInboxComponent) {
    }
    // rooms = this.chatInboxComponent.rooms;

    ngOnInit() {
        console.log('20');
        this.setupSocketConnection();
        this.route.params.subscribe(
            (params: Params)=>{
                this.room = params['room'];
                // let rooms = [];
                // rooms = this.chatInboxComponent.rooms;
                // this.room = rooms[this.id]
                console.log(this.room);
            },e=>{
                console.log('26',e)
            }
         )
        console.log('40',this.room);
    }

    //SEND MESSAGE
    sendMessage() {
        const messageToSend = this.message


        this.socket.emit('sendMessage', {messageToSend, room: this.room}, (e) => {
            if (e) {
                return console.log(e);
            }
            console.log('message delivered!')
        })
    }

    setupSocketConnection() {
        this.socket = io(SOCKET_ENDPOINT);  //endpoint setup
        console.log('endpoint setup');

        this.socket.emit('join', { username: 'raja rabish kumar', room: this.room }, (e) => {
            if (e) {
                // alert(e);
            }
            console.log('join emit completed');

        })

        this.socket.on('message', (data: string) => {
            if (data) {
                const element = document.createElement('div');
                element.innerHTML = data;
                element.style.background = 'rgb(255, 80, 118)';
                element.style.padding = '15px 30px';
                element.style.margin = '10px';
                document.getElementById('messages').appendChild(element);
            }
        });


    }
}