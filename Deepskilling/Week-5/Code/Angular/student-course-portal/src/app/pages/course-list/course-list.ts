import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCard,
    HighlightDirective
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses$!: Observable<Course[]>;
  courses: Course[] = [];

  isLoading = true;
  errorMessage = '';

  selectedCourseId = 0;
  searchTerm = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Keep existing search logic
    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') || '';

    // Dispatch action to load courses
    this.store.dispatch(CourseActions.loadCourses());

    // Get courses from NgRx Store
    this.courses$ = this.store.select(selectAllCourses);

    // Optional: stop loading once data is received
    this.courses$.subscribe(data => {
      this.courses = data;
      this.isLoading = false;
    });
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }

  goToCourse(courseId: number) {
    this.router.navigate(['courses', courseId]);
  }

  updateSearch() {
    this.router.navigate(
      ['courses'],
      {
        queryParams: {
          search: this.searchTerm
        }
      }
    );
  }
}