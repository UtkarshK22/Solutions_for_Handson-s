import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CourseSummaryWidget, Notification],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

// [property] performs one-way binding from component to the DOM.
// [(ngModel)] performs two-way binding between the component and the DOM.

export class Home implements OnInit{
  courses: Course[] = [];

  portalName = 'Student Course Portal';
  isPortalActive = true;

  message = '';
  searchTerm = '';
  coursesAvailable = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.coursesAvailable = 12;
    this.courses = this.courseService.getCourses();
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

}