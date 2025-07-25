import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';

import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KendoComponent } from './kendo/kendo.component';
import { ParentComponent } from './parent/parent.component';


export const routes: Routes = [
    {path:"home",component:HomeComponent},
    {path:"detail",component:DetailComponent},
    {path:"form", component:FormComponent},
    {path:"detail/:empId",  component:DetailComponent},
    {path:"form/:empId",  component:FormComponent},
    {path:"parent", component:ParentComponent},
    {path:"grid",component:KendoComponent},
    
    {path:"",redirectTo:"/parent",pathMatch:'full'},
    {path:"**",redirectTo:"parent"}
];
