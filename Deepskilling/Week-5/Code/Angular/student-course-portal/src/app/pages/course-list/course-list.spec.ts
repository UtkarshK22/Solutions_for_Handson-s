import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';

import { CourseList } from './course-list';

describe('CourseList', () => {

  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideMockStore({
          initialState: {
            course: {
              courses: [],
              loading: false,
              error: null
            },
            enrollment: {
              enrolledCourseIds: []
            }
          }
        }),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => ''
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});