import { Component } from '@angular/core';
import { ServiceService } from '../services/resourceService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  constructor(private activatedroute: ActivatedRoute, private service: ServiceService) { }
  empId?: string
  detail: any

  ngOnInit() {
    this.empId = this.activatedroute.snapshot.paramMap.get("empId")!;
    this.service.GetEmployeeById(this.empId).subscribe((data) => {
      this.detail = data;
    });
  }

}

