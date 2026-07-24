import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CourseDetail } from './course-detail';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';

describe('CourseDetail', () => {

  let component: CourseDetail;
  let fixture: ComponentFixture<CourseDetail>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseDetail],
      providers: [
        provideRouter([]),

        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => '1'
            })
          }
        },

        {
          provide: CourseService,
          useValue: {
            getCourseById: () =>
              of({
                id: 1,
                title: 'Angular',
                credits: 4
              })
          }
        },

        {
          provide: EnrollmentService,
          useValue: {
            getStudentsByCourse: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});