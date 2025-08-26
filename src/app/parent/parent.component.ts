import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { DetailComponent } from '../detail/detail.component';

import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ServiceService } from '../services/resourceService';
import { FormComponent } from '../form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthServiceService,  } from '../services/auth-service.service';


enum Comp{
  home,detail,form,parent
};


interface Resource{
  empId:Number,
  EmpId:Number,
  Name:string,
  
  Designation:string,
  Reporting_To:string,
  Billable:any,
  Skills:string,
  Project_Allocation:string,
  Location:string,
  Remarks:string



};


@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, HomeComponent,DetailComponent,HttpClientModule,RouterOutlet,RouterLink,FormComponent, ],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
   
})
export class ParentComponent {
constructor(private httpclient :ServiceService, private router:Router, private authService: AuthServiceService){}

  dashboardCards = [
    { title: 'Total Employees', value: 0, icon: 'fas fa-users' },
    { title: 'Available Today', value: 0, icon: 'fas fa-user-check' },
    { title: 'On Leave', value: 0, icon: 'fas fa-user-times' },
    { title: 'Billable / Non-billable', value: '', icon: 'fas fa-briefcase' }
  ];

  ngOnInit() {
  
  }
  

  
}