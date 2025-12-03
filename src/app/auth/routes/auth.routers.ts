import {Routes } from "@angular/router";
import { publicGuard } from "../guard/public-guard.guard";


export const authRoutes:Routes= [

    {
        path:'login',
        loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent),
    },
    {
        path:'register',
        loadComponent:()=> import('../components/register/register.component').then(m=>m.RegisterComponent),
    }
];
