import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { catchError, throwError } from "rxjs";


export const authInterceptor: HttpInterceptorFn = (req,next)=>{
    const router = inject(Router);
    
    const clonedRequest = req.clone({
        withCredentials:true
    });

    return next(clonedRequest).pipe(
        catchError((error) => {
            if (error.status === 401 || error.status === 403) {
                const currentUrl = router.url;
                if (!currentUrl.startsWith('/auth') && !req.url.includes('/verify')) {
                    router.navigate(['/auth/login']);
                }
            }
            return throwError(() => error);
        })
    );
}