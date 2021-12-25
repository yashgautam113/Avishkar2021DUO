import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    room: any;
    rooms: any;
    selectedRoom: any;
    messageArray: { user: string, message: string, createdAt: any }[] = [];
    messageText: string;    //conatins input string
    socket;
    isOpen: boolean;

    constructor(private route: ActivatedRoute, private authService: AuthService) { }
    user = this.authService.id;
    ngOnInit() {
        // this.room = this.route.snapshot.paramMap.get('name');
        this.setupSocketConnection()

        this.showChatHistory()
        this.printMessages()
    }

    showChatHistory() {
        this.messageArray = []

        this.socket.on('chat-history', (chat) => {
            chat.forEach(element => {
                this.messageArray.push({user : element.username, message: element.msg, createdAt: element.createdAt})
            });
            console.log('37 list comp.ts', chat);

        })
    }

    printMessages() {
        console.log('31');

        this.socket.on('message', (currMessage) => {
            console.log('34', currMessage);

            this.messageArray.push({ message: currMessage.msg, user: currMessage.username, createdAt: currMessage.createdAt })
            console.log('33', this.messageArray);

        })
    }

    setupSocketConnection() {
        this.socket = io(SOCKET_ENDPOINT)

        //show messages

        //show users list
        this.socket.on('showExistingRooms', (rooms) => {
            console.log('30 Rooms Received');
            this.rooms = rooms;
        })

    }

    //Open room
    selectUserHandler(room) {
        this.isOpen = true; //opens input body
        this.room = room;

        this.selectedRoom = this.rooms.find((currRoom) => {
            return currRoom === room
        })

        this.messageArray = [];
        console.log('46 joining in the room', room);

        this.socket.emit('join', { username: this.user, room }, (e) => {
            if (e) {
                console.log('50', e)
            }
            console.log('join emit completed');
        })
    }

    sendMessage() {
        const messageToSend = this.messageText
        this.messageText = ''
        // console.log('message to send is', messageToSend);
        this.socket.emit('sendMessage', ({ username: this.user, messageToSend, room: this.room }), (e) => {
            console.log('63 emitted msg:', messageToSend);
            console.log('room: ', this.room);
        })
    }
}