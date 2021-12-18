import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', './demo.css', './style.css']
})

export class ProfileComponent {
constructor(private authService: AuthService) {}

    onlogout(){
        this.authService.logout();
    }
} 