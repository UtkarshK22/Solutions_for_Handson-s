import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { HighlightDirective } from '../../directives/highlight';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges, OnInit {

  enrolled = false;
  isExpanded = false;

  enrolledIds$!: Observable<number[]>;

  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: string;
  };

  @Output() enrollRequested = new EventEmitter<number>();

  @Output()
  cardClicked = new EventEmitter<number>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course changed:', changes['course']);
  }

  get cardClasses() {
    return {
      'card--enrolled': this.enrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded
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

  toggleEnrollment(event: Event) {
    event.stopPropagation();
  
    this.store.select(selectEnrolledIds).pipe(
      take(1)
    ).subscribe(ids => {
      if (ids.includes(this.course.id)) {
        this.store.dispatch(
          EnrollmentActions.unenrollFromCourse({
            courseId: this.course.id
          })
        );
      } else {
        this.store.dispatch(
          EnrollmentActions.enrollInCourse({
            courseId: this.course.id
          })
        );
      }
    });
  }

  isEnrolled(): Observable<number[]> {
    return this.enrolledIds$;
  }

  onCardClick() {
    this.cardClicked.emit(this.course.id);
  }

}