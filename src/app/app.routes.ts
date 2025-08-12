import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';

import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KendoComponent } from './kendo/kendo.component';
import { ParentComponent } from './parent/parent.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: "signup", component: SignupPageComponent },
    { path: "", redirectTo: "/signup", pathMatch: 'full' },
    {
        path: '', component: MainPageComponent,
        children: [
            { path: "home", component: HomeComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Manager', 'User'] } },
            { path: "detail", component: DetailComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Manager', 'User'] } },
            { path: "form", component: FormComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Manager'] } },
            { path: "detail/:empId", component: DetailComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Manager'] } },
            { path: "form/:empId", component: FormComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Manager'] } },
            { path: "parent", component: ParentComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Manager', 'User'] } },
            { path: "grid", component: KendoComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Manager', 'User'] } },
        ]
    },

    { path: "**", redirectTo: "/signup" }
];
