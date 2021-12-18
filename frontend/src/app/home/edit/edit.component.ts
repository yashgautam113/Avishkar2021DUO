import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls : ['./edit.component.css']
})

export class EditComponent {
    
    onSubmit(form: NgForm){
        if(!form.valid) return;
        console.log('13', form.value.phone);
    }
}