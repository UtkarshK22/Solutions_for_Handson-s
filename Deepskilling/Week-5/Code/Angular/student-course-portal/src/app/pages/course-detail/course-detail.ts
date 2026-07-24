import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {

  course?: Course;
  students: Student[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.courseService.getCourseById(id);
      }),
      switchMap(course => {
        this.course = course;
        return this.enrollmentService.getStudentsByCourse(course.id);
      })
    ).subscribe({
      next: (students) => {
        this.students = students;
        this.cdr.detectChanges(); // tell Angular to re-render — zoneless won't do it for us
      },
      error: (err) => {
        console.error(err);
        this.cdr.detectChanges(); // still need this so any error UI updates too
      }
    });
  }
}