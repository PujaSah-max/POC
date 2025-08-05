import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../services/resourceService';
import { ActivatedRoute, Router, } from '@angular/router';
import { isVisible } from '@progress/kendo-angular-common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DropDownsModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { NgSelectModule } from '@ng-select/ng-select';
import { techSkills } from '../Constants/constants';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule, DropDownsModule, MultiSelectModule, NgSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  constructor(private service: ServiceService, private activatedroute: ActivatedRoute, private router: Router, http: HttpClient) { }
  public isEditMode: boolean = false;
  myform: FormGroup = new FormGroup({
    empId: new FormControl("EMP", [Validators.required, Validators.minLength(3)]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    designation: new FormControl("", [Validators.required, Validators.minLength(3)]),
    reporting_To: new FormControl("", [Validators.required, Validators.minLength(3)]),
    billable: new FormControl("", [Validators.required]),
    skills: new FormControl([], [Validators.required]),
    project_Allocation: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    otherLocation: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.email]),
    ctE_DOJ: new FormControl("", [Validators.required,]),
    remarks: new FormControl("", [Validators.required]),
  })

  data: any;
  public newDetails: any[] = [];
  public designations: string[] = [];
  public skillsList: string[] = [];
  projectList: string[] = [];

  techSkills: any[] = techSkills;


  empId!: string;

  ngOnInit() {
    this.empId = this.activatedroute.snapshot.paramMap.get('empId')!;
    this.service.GetAllEmployees().subscribe(data => {
      this.newDetails = data;
      this.designations = [...new Set(this.newDetails.map(item => item.designation))];
      this.skillsList = [...new Set(this.newDetails.map(item => item.skills))];
      this.projectList = [...new Set(this.newDetails.map(item => item.project_Allocation))];
    });

    if (this.empId)
      this.service.GetEmployeeById(this.empId).subscribe((data: any) => {
        console.log("data", data);

        if (!this.locations.includes(data.location)) {
          data.otherLocation = data.location;
          data.location = "Other";
          this.showOtherInput = true;
        }
        const billableValue = data.billable ? 'YES' : 'NO';

        data.skills = data.skills.split(',').map((skill: string) => {
          return skill.trim();
        });

        this.myform.patchValue({
          ...data,
          billable: billableValue
        });


      })

    if (this.empId) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
  }

  onDesignationChange(value: string) {
    this.myform.get('designation')?.setValue(value);
  }

  onSkillChange(value: string): void {
    this.myform.get('skills')?.setValue(value);
  }

  onProjectChange(value: string): void {
    this.myform.get('project_Allocation')?.setValue(value);
  }

  submitted = false;

  details: any[] = []

  locations: string[] = [
    'Delhi',
    'Mumbai',
    'Bengaluru',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
    'Other'
  ];
  Onsubmit() {
    console.log(this.myform.value);
    console.log("Payload sent to API:", this.myform.value);


    let obj = {
      EmpId: this.myform.get('EmpId')?.value,
      Name: this.myform.get('Name')?.value,
      Designation: this.myform.get('Designation')?.value,
      Reporting_To: this.myform.get('Reporting_To')?.value,
      billable: this.myform.get('billable')?.value === "YES" ? true : false,
      skills: this.myform.get('skills')?.value,
      Project_Allocation: this.myform.get('Project_Allocation')?.value,
      location: this.myform.get('location')?.value === 'Other'
        ? this.myform.get('OtherLocation')?.value
        : this.myform.get('location')?.value,
      OtherLocation: this.myform.get('otherlocation')?.value,
      Email: this.myform.get('Email')?.value,
      CTE_DOJ: (this.myform.get('CTE_DOJ')?.value),
      Remarks: this.myform.get('Remarks')?.value,
    }

    console.log("onSubmit ", this.myform.value);
    this.submitted = true;
    this.myform.markAllAsTouched();
    this.details.push(this.myform.value);
    console.log(this.details);

    if (this.empId) {
      console.log("Inside Update Request")
      let data = this.myform.value;
      data.billable = data.billable === "YES" ? true : false;
      data.location = data.location === "Other" ? this.myform.get("otherLocation")?.value
        : this.myform.get("location")?.value;

      data.skills = data.skills.join(', ');

      console.log("data", data);
      this.service.updateempdetails(data).subscribe((response) => {
        this.router.navigate(['/home']);
        const data = this.myform.value;

        alert(
          `Employee Details Updated:\n\n` +
          `EmpID: ${data.empId}\n` +
          `Name: ${data.name}\n` +
          `Designation: ${data.designation}\n` +
          `Reporting_To: ${data.reportingTo}\n` +
          `Billable: ${data.billableStatus}\n` +
          `Skills: ${data.skills}\n` +
          `Project_Allocation: ${data.projectAllocation}\n` +
          `Location: ${data.location}\n` +
          `Email: ${data.email}\n` +
          `CTE_DOJ: ${data.cteDoj}\n` +
          `Remarks: ${data.remarks}`
        );
        this.myform.reset();
      });
    } else {
      let data = this.myform.value;
      data.billable = data.billable == "YES" ? true : false;
      data.location = data.location === "Other" ? this.myform.get("otherLocation")?.value
        : this.myform.get("location")?.value;
      let skillsArray: string[] = data.skills;
      data.skills = skillsArray.join(', ');

      console.log("Inside Add New MEployee ", data);
      this.service.Addempdetails(data).subscribe((response) => {
        console.log(this.myform.value)
        this.router.navigate(['/home']);


        const data = this.myform.value;

        alert(
          `Employee Details Submitted:\n\n` +
          `EmpID: ${data.empId}\n` +
          `Name: ${data.name}\n` +
          `Designation: ${data.designation}\n` +
          `Reporting_To: ${data.reportingTo}\n` +
          `Billable: ${data.billableStatus}\n` +
          `Skills: ${data.skills}\n` +
          `Project_Allocation: ${data.projectAllocation}\n` +
          `Location: ${data.location}\n` +
          `Email: ${data.email}\n` +
          `CTE_DOJ: ${data.cteDoj}\n` +
          `Remarks: ${data.remarks}`
        );
        this.myform.reset();
      });
    }
  }

  showOtherInput = false;

  onLocationChange(): void {
    const selected = this.myform.get('location')?.value;
    console.log('Selected location:', selected);

    this.showOtherInput = selected === 'Other';

    const otherCtrl = this.myform.get('otherLocation');

    if (this.showOtherInput) {
      otherCtrl?.setValidators([Validators.required]);
    } else {
      otherCtrl?.clearValidators();
      otherCtrl?.setValue('');
    }
    otherCtrl?.updateValueAndValidity();
  }

  resetForm() {
    this.myform.reset();
  }

  selectedFile: File | null = null;
  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitFile() {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    this.service.uploadExcelFile(this.selectedFile).subscribe({
      next: () => alert('Upload successful!'),
      error: () => alert('Upload failed.')
    });


  }

}