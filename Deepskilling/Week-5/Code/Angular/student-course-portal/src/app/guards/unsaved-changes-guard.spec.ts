import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { unsavedChangesGuard } from './unsaved-changes-guard';
import { ReactiveEnrollmentForm } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

describe('unsavedChangesGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should allow navigation when form is not dirty', () => {

    const component = {
      enrollForm: {
        dirty: false
      }
    } as ReactiveEnrollmentForm;

    const result = TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(
        component,
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
        {} as RouterStateSnapshot
      )
    );

    expect(result).toBe(true);
  });

});