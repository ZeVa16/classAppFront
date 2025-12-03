import { Routes } from '@angular/router';
import { authenticatedGuard } from './auth/guard/user-authenticated.guard';
import { publicGuard } from './auth/guard/public-guard.guard';

export const routes: Routes = [

    {
        path:'auth',
        loadChildren:() =>import('./auth/routes/auth.routers').then(m=> m.authRoutes),
        canActivate:[publicGuard],
    },
    {
        path:'dashboard',
        loadComponent:()=>import('./shared/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent),
        canActivate:[authenticatedGuard]
    },
    {   
        path:'dashboard/class/:id',
        loadComponent: ()=>import('./core/components/detailsclass/detailsclass.component').then(m=>m.DetailsclassComponent),
        canActivate:[authenticatedGuard]
    },
    {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
    }
    
];
