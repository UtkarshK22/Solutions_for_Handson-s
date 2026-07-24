import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Delay spinner update until after current change detection
  queueMicrotask(() => loadingService.show());

  return next(req).pipe(
    finalize(() => queueMicrotask(() => loadingService.hide()))
  );
};