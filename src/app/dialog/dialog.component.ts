import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl,FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
actionButton : string ="Enregistrer"
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  employeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstname : ['', [Validators.required]],
      name : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      department : ['', [Validators.required]],
      wage:['', [Validators.required]],
      sales_objective:['', [Validators.required]],
      hired_at : ['', [Validators.required]],
    });

    if (this.editData) {
      this.actionButton = "Modifier";
      this.employeeForm.controls['firstname'].setValue(this.editData.firstname);
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['role'].setValue(this.editData.role);
      this.employeeForm.controls['department'].setValue(this.editData.department);
      this.employeeForm.controls['wage'].setValue(this.editData.wage);
      this.employeeForm.controls['sales_objective'].setValue(this.editData.sales_objective);
      this.employeeForm.controls['hired_at'].setValue(this.editData.hired_at);
    }
  }
  addEmployee() {
    if(!this.editData){
    if (this.employeeForm.valid) {
      this.api.postEmployee(this.employeeForm.value).subscribe({
        next: (response) => {
          alert("L'employé.e a bien été enrgistré.");
          this.employeeForm.reset();
          this.dialogRef.close('Enregistrer');
        },
        error: () => {
          alert("Une erreur c'est produite lors de l'enregistrement.")
        }
      })
      }
    } else {
      this.updateEmployee()
    }
  }
  updateEmployee() {
    this.api.putEmployee(this.employeeForm.value, this.editData.id).subscribe({
      next: (response) => {
        alert("Les données de l'employé.e a bien été modifié. ❗");
        this.employeeForm.reset();
        this.dialogRef.close('Modifier');
      },
      error: () => {
        alert("Une erreur est survenue lors de la modification des données de l'employé.e. ⚠️");
      }
    })
  }
}
