import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,FormsModule, CourseCard, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit{

  courses: Course[] = [];

  isLoading = true;
  selectedCourseId = 0;
  searchTerm = '';

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

    constructor(
      private cdr: ChangeDetectorRef, 
      private courseService: CourseService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.searchTerm =
    this.route.snapshot.queryParamMap.get('search') || '';
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    },1500);
  }

  // trackBy improves performance by allowing Angular
  // to reuse existing DOM elements instead of recreating them.
  trackByCourseId(index:number,course:any){
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