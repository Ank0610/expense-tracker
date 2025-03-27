import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Required for common Angular directives like `ngIf`, `ngFor`
import { FormsModule } from '@angular/forms';    // For two-way data binding with `ngModel`

@Component({
  selector: 'app-contact',
  standalone: true,  // Marks this as a standalone component
  imports: [CommonModule, FormsModule],  // Import necessary modules here
  templateUrl: './contact.component.html',  // Your HTML template
  styleUrls: ['./contact.component.css']   // Your CSS styles
})
export class ContactComponent {
  contactDetails = {
    name: 'Ankit Raj',
    email: 'ankit.raj@bharuwasolutions.com',
    phone: '7272938457',
    address: '62A Technopolis IT Hub'
  };

  formData = {
    name: '',
    email: '',
    message: ''
  };
}
