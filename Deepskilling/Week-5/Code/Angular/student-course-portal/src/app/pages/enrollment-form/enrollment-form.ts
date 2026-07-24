import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {

  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  submitted = false;
  errorMessage = '';

  constructor(private enrollmentService: EnrollmentService) {}

  onSubmit(form: NgForm) {
    if (!this.courseId) {
      this.errorMessage = 'Course ID is required.';
      return;
    }

    this.enrollmentService.createEnrollment({
      studentId: Date.now(), // placeholder until you have real student records/auth
      courseId: this.courseId
    }).subscribe({
      next: () => {
        this.submitted = true;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit enrollment.';
        console.error(err);
      }
    });
  }
}