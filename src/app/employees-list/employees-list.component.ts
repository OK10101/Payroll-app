import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'name', 'email', 'department', 'wage', 'sales_objective','role', 'hired_at', 'edit', 'delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployeesList();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'saved') {
        this.getEmployeesList();
      }
    })
  }
  getEmployeesList() {
    this.api.getEmployees()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => { alert("Une erreur ne permet pas de récupérer la liste ⚠️")}
    })
  }
  editEmployee(row : any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Modifier') {
        this.getEmployeesList();
      }
    })
  }



  deleteEmployee(id: number) {
    this.api.deleteEmployee(id).subscribe({
      next: (response) => {
        alert("Les données de l'employé.e ont bien été éffacer. 👍");
        this.getEmployeesList();
      },
      error: () => {
        alert("Une erreur s'est rpoduit durant l'opération. 😉")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
