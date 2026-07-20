import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { HighlightDirective } from '../../directives/highlight';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  enrolled = false;
  isExpanded = false;

  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: string;
  };

  @Output() enrollRequested = new EventEmitter<number>();

  // NEW
  @Output() cardClicked = new EventEmitter<number>();

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course changed:', changes['course']);
  }

  get cardClasses() {
    return {
      'card--enrolled': this.enrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  get borderColor() {
    switch (this.course.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  toggleEnrollment() {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }

  isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  // NEW
  onCardClick() {
    this.cardClicked.emit(this.course.id);
  }
}