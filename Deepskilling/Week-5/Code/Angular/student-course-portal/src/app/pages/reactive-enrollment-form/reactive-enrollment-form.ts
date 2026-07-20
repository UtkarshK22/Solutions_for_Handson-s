import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  // Custom validator
  noCourseCode(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value && value.toString().startsWith('XX')) {
      return { noCourseCode: true };
    }

    return null;
  }

  // Async validator
  simulateEmailCheck(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {

    return new Promise((resolve) => {

      setTimeout(() => {

        if (
          control.value &&
          control.value.includes('test@')
        ) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }

      }, 800);

    });

  }

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: this.fb.control(
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          this.simulateEmailCheck.bind(this)
        ]
      ),

      courseId: [
        '',
        [
          Validators.required,
          this.noCourseCode.bind(this)
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array<FormControl<string>>([])

    });

  }

  // enrollForm.value returns enabled controls only.
  // enrollForm.getRawValue() returns all controls including disabled controls.
  onSubmit() {
    console.log(this.enrollForm.value);
    console.log(this.enrollForm.getRawValue());
    this.enrollForm.markAsPristine();
  }

  // Typed getter for FormArray
  get additionalCourses(): FormArray<FormControl<string>> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string>>;
  }

  // Using a getter avoids casting FormArray in the template
  // and keeps the template cleaner.

  addCourse() {

    this.additionalCourses.push(

      new FormControl<string>(
        '',
        {
          nonNullable: true,
          validators: [Validators.required]
        }
      )

    );

  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

}