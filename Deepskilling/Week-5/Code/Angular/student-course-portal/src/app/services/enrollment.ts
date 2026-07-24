import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from './course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];
  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}
  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds =
      this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return [];
  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(
      `http://localhost:3000/students?courseId=${courseId}`
    );
  }
  createEnrollment(enrollment: { studentId: number; courseId: number }): Observable<any> {
    return this.http.post('http://localhost:3000/enrollments', enrollment);
  }
}