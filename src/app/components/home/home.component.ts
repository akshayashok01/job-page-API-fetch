import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { UserListComponent } from '../user-list/user-list.component';
import { JoinComponent } from '../join/join.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [FilterComponent,UserListComponent,JoinComponent,BreadcrumbComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
