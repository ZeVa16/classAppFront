import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth-service.service";
import { filter, map, take } from "rxjs";

export const authenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated.pipe( 
        filter(value => value !== null),
        take(1),
        map(isAuthenticated => {
            
            if (isAuthenticated) {
                return true; 
            } else {
                router.navigate(['/auth/login'], {
                    queryParams: { returnUrl: state.url } 
                });
                return false;
            }
        })
    );
};