import { HttpInterceptorFn } from '@angular/common/http';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const mockToken = 'mock-token-12345';

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${mockToken}`
    }
  });

  return next(clonedReq);
};
