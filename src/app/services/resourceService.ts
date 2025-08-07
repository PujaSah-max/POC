
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
}


