import { Component } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-kendo',
  standalone: true,
  imports: [GridModule],
  templateUrl: './kendo.component.html',
  styleUrl: './kendo.component.scss'
})
export class KendoComponent {
   public EMPLOYEE_DATA: any[] = [
  {
    name: 'Puja Sah',
    employeeId: 'EMP001',
    age: 28,
    email: 'puja.sah@example.com',
    address: 'Kolkata, West Bengal',
    gender: 'Female',
    project: 'Resource Tracker'
  },
  {
    name: 'Rahul Kumar',
    employeeId: 'EMP002',
    age: 30,
    email: 'rahul.kumar@example.com',
    address: 'Patna, Bihar',
    gender: 'Male',
    project: 'Agri Insights'
  },
  {
    name: 'Sneha Roy',
    employeeId: 'EMP003',
    age: 26,
    email: 'sneha.roy@example.com',
    address: 'Bhubaneswar, Odisha',
    gender: 'Female',
    project: 'Gene Transfer Tool'
  }
];


}
