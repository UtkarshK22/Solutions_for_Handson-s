import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CourseCard } from './course-card';

describe('CourseCard', () => {

  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: {
            enrollment: {
              enrolledCourseIds: []
            }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});