import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';  // Add this import
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,CommonModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Welcome to the Expense Tracker';
}
