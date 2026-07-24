import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25}),
    provideEffects([CourseEffects]),
    provideState('course', courseReducer),
    provideState('enrollment', enrollmentReducer),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, loadingInterceptor, errorInterceptor])
    )
  ]
};