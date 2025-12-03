import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth-service.service";
import { filter, map, take } from "rxjs";

export const publicGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated.pipe( 
        filter(value => value !== null),
        take(1),
        map(isAuthenticated => {
            console.log('PublicGuard - isAuthenticated:', isAuthenticated)
            if (isAuthenticated) {
                router.navigate(['/dashboard'])
                return false;
            } else {
                return true;
            }
        })
    );
};