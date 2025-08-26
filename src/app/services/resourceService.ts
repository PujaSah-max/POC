
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiDictionary } from './api-dictionary';
import { HttpParams } from '@angular/common/http';
import { signupDto } from '../Interface/Interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly common = 'Resource/';
  constructor(private api: ApiService) { }

  GetEmployeeById(empId: string) {
    const params = new HttpParams().set('empId', empId);
    return this.api.get(this.common + ApiDictionary.GetEmployeeById.url, params);
  }

  Addempdetails(data: any) {
    return this.api.post(this.common + ApiDictionary.AddEmployee.url, data);
  }

  GetAllEmployees() {
    return this.api.get(this.common + ApiDictionary.GetAllEmployees.url);
  }

  updateempdetails(data: any) {
    return this.api.put(this.common + ApiDictionary.UpdateEmployee.url, data);
  }

  deleteempdetails(empId: string) {
    const url = this.common + `${ApiDictionary.DeleteEmployee.url}?empId=${empId}`;
    return this.api.delete(url);
  }

  uploadExcelFile(file: File) {
    return this.api.uploadFile(this.common + ApiDictionary.UploadExcel.url, file);
  }
  // GetEmployeesPaged(page: number, pageSize: number, search: string, sortBy: string, sortOrder: string) {
  //   let params = new HttpParams()
  //     .set('page', page)
  //     .set('pageSize', pageSize)
  //     .set('search', search || '')
  //     .set('sortBy', sortBy || 'Name')
  //     .set('sortOrder', sortOrder || 'ASC');

  //   return this.api.get(this.common + ApiDictionary.GetEmployeesPaged.url, params);
  // } 

  GetEmployeesPaged(
page: number, pageSize: number, sortBy: string, sortOrder: string, filters: any, )  {
  let params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize)
    .set('sortBy', sortBy || 'Name')
    .set('sortOrder', sortOrder || 'ASC');

  // Append column-wise filters
  if (filters) {
    if (filters.empId) params = params.set('empId', filters.empId);
    if (filters.name) params = params.set('name', filters.name);
    if (filters.designation) params = params.set('designation', filters.designation);
    if (filters.skills) params = params.set('skills', filters.skills);
    if (filters.project_Allocation) params = params.set('project', filters.project_Allocation);
    if (filters.email) params = params.set('email', filters.email);
    if (filters.location) params = params.set('location', filters.location);
  }

  return this.api.get(this.common + ApiDictionary.GetEmployeesPaged.url, params);
}

}


