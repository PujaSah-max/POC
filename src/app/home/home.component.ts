import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ServiceService } from '../services/resourceService';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { FormsModule } from "@angular/forms";
import { ExcelExportData } from "@progress/kendo-angular-excel-export";
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';

import {
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from "@progress/kendo-angular-grid";
import { KENDO_TOOLBAR } from "@progress/kendo-angular-toolbar";
import { KENDO_LABELS } from "@progress/kendo-angular-label";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    NgFor,
    ExcelModule,
    GridModule,
    ToolBarModule,
    FormsModule,
    KENDO_GRID,
    KENDO_GRID_EXCEL_EXPORT,
    KENDO_GRID_PDF_EXPORT,
    KENDO_TOOLBAR,
    KENDO_INPUTS,
    KENDO_LABELS,
    ComboBoxModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class HomeComponent implements OnInit {

  public details: any[] = [];
  public selectedKeys: any[] = [];

  public isBulkEditMode: boolean = false;
  public editedFormGroup!: FormGroup;
  public selectedItems: any[] = [];
  designationList: any[] = [];
  skillsList: any[] = [];
  projectList: any[] = [];
  locationList:any[]=[];
  
  


  constructor(
    private service: ServiceService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchEmployees();
    this.initBulkForm();
  }

  fetchEmployees() {
    this.service.GetAllEmployees().subscribe(data => {
      this.details = data;
      this.designationList = [...new Set(data.map((item: { designation: any; }) => item.designation))];
      this.skillsList = [...new Set(data.map((item: { skills: any; }) => item.skills))];
      this.projectList = [...new Set(data.map((item: { project_Allocation: any; }) => item.project_Allocation))];
      this.locationList=[...new Set(data.map((item: {location: any; }) => item.location))]; 
    });
  }

  Showhim(detail: any) {
    this.route.navigate([`/detail/${detail.empId}`]);
  }

  editEmployee(empId: any) {
    this.route.navigate([`/form/${empId}`]);
  }

  deletedetails(empId: any) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.service.deleteempdetails(empId).subscribe(() => {
        this.fetchEmployees();
      });
    }
  }

  bulkDelete() {
    if (this.selectedKeys.length === 0) {
      alert("Please select employees to delete.");
      return;
    }

    if (confirm("Are you sure you want to delete selected employees?")) {
      let deleteCount = 0;

      this.selectedKeys.forEach(empId => {
        this.service.deleteempdetails(empId).subscribe(() => {
          deleteCount++;

          if (deleteCount === this.selectedKeys.length) {
            alert("Selected employees deleted.");
            this.selectedKeys = [];
            this.fetchEmployees();
          }
        });
      });
    }
  }

  public allData = (): ExcelExportData => {
    return {
      data: this.details ?? []
    };
  };

  initBulkForm() {
    this.editedFormGroup = this.fb.group({
      
      designation: [''],
      location:[''],
      billable: [''],
      skills: [''],
      remarks: ['']
    });
  }
  onDesignationChange(value: string): void {
    this.editedFormGroup.get('designation')?.setValue(value);
  }
  onSkillsChange(value: string): void {
  this.editedFormGroup.get('skills')?.setValue(value);
}
onLocationChange(value: string): void {
  this.editedFormGroup.get('location')?.setValue(value);
}

  toggleBulkEdit() {
    this.isBulkEditMode = !this.isBulkEditMode;
    if (this.isBulkEditMode) {
      this.selectedItems = this.details.filter(item =>
        this.selectedKeys.includes(item.empId)
      );
    }
  }

  // applyBulkChanges() {
  // if (this.selectedItems.length === 0) {
  //   alert("Please select employees to update.");
  //   return;
  // }

  // if (this.editedFormGroup.invalid) {
  //   alert("Please fill in valid data before updating.");
  //   return;
  // }

  // const updatedValues = this.editedFormGroup.value;
  
  // let updateCount = 0;

  // this.selectedItems.forEach(item => {
  //   const updatedEmployee = {
  //     ...item,
  //     ...updatedValues,
  //     billable: updatedValues.billable === 'true' || updatedValues.billable === true
  //   };

  //   this.service.updateempdetails(updatedEmployee).subscribe({
  //     next: () => {
  //       console.log(`Updated employee: ${updatedEmployee.empId}`);
  //       updateCount++;

  //       // Once all updates are done
  //       if (updateCount === this.selectedItems.length) {
  //         this.fetchEmployees(); // Reload data from backend
  //         this.selectedKeys = [];
  //         this.isBulkEditMode = false;
  //         this.editedFormGroup.reset();
  //         alert("Selected employees updated.");
  //       }
  //     },
  //     error: (err) => {
  //       console.error(`Error updating employee ${updatedEmployee.empId}:`, err);
  //     }
  //   });
  // });
// }

applyBulkChanges() {
  if (this.selectedItems.length === 0) {
    alert("Please select employees to update.");
    return;
  }

  if (this.editedFormGroup.invalid) {
    alert("Please fill in valid data before updating.");
    return;
  }

  const updatedValues = this.editedFormGroup.value;

  // Filter out empty values
  const nonEmptyUpdatedValues = Object.fromEntries(
    Object.entries(updatedValues).filter(([_, value]) => value !== null && value !== undefined && value !== '')
  );

  let updateCount = 0;

  this.selectedItems.forEach(item => {
    const updatedEmployee = {
      ...item,
      ...nonEmptyUpdatedValues
    };

    this.service.updateempdetails(updatedEmployee).subscribe({
      next: () => {
        console.log(`Updated employee: ${updatedEmployee.empId}`);
        updateCount++;

        if (updateCount === this.selectedItems.length) {
          this.fetchEmployees();
          this.selectedKeys = [];
          this.isBulkEditMode = false;
          this.editedFormGroup.reset();
          alert("Selected employees updated.");
        }
      },
      error: (err) => {
        console.error(`Error updating employee ${updatedEmployee.empId}:`, err);
      }
    });
  });
}


}
