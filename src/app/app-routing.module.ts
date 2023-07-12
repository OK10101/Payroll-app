import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EmployeesListComponent } from './employees-list/employees-list.component'

const routes: Routes = [
  { path: 'employees', component: EmployeesListComponent },
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
