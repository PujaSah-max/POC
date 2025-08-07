import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { GridModule } from '@progress/kendo-angular-grid';

import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { ParentComponent } from './parent/parent.component';
import { HomeComponent } from './home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgIf, ToolBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'POC';
  showallemp = false;
  Togglefunc() {
    this.showallemp = true;
  }

}

