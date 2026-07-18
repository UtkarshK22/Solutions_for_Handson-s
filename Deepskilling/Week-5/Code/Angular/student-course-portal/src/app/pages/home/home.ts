import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

// [property] performs one-way binding from component to the DOM.
// [(ngModel)] performs two-way binding between the component and the DOM.

export class Home {

  portalName = 'Student Course Portal';
  isPortalActive = true;

  message = '';
  searchTerm = '';
  coursesAvailable = 0;

  ngOnInit(): void {
    this.coursesAvailable = 12;
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

}