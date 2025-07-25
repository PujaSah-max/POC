
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiDictionary } from './api-dictionary';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private api: ApiService) {}

  GetEmployeeById(empId: string) {
    const params = new HttpParams().set('empId', empId);
    return this.api.get(ApiDictionary.GetEmployeeById.url, params);
  }

  Addempdetails(data: any) {
    return this.api.post(ApiDictionary.AddEmployee.url, data);
  }

  GetAllEmployees() {
    return this.api.get(ApiDictionary.GetAllEmployees.url);
  }

  updateempdetails(data: any) {
    return this.api.put(ApiDictionary.UpdateEmployee.url, data);
  }

  deleteempdetails(empId: string) {
    const url = `${ApiDictionary.DeleteEmployee.url}?empId=${empId}`;
    return this.api.delete(url);
  }
   uploadExcelFile(file: File) {
    return this.api.uploadFile(ApiDictionary.UploadExcel.url, file);
  }
}


