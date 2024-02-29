import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { AdminAuthGuard } from './services/adminauth.guard';
import { LoginComponent } from './login/login.component';
import { UserAuthGuard } from './services/userauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerListComponent },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'customers/edit/:id',
    component: CustomerEditComponent,
    canActivate: [UserAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
