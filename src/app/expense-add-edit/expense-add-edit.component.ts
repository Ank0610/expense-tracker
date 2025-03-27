import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from '../services/expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-expense-add-edit',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './expense-add-edit.component.html',
  styleUrl: './expense-add-edit.component.css'
})
export class ExpenseAddEditComponent {
  expenseService = inject(ExpenseService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  categories = ["food", "Travel", "Entertainment", "Luxury", "Movies", "Dating"];
  expenseForm: FormGroup;
  isEditMode = false;
  expenseId: number = 0;

  /**
   *
   */
  constructor(private fb: FormBuilder) {

    this.expenseForm = this.fb.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      amount: ["", [Validators.required, Validators.min(0.01)]],
      date: ["", Validators.required]



    });

    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id) {
        this.isEditMode = true;
        this.expenseId = +id;
        this.expenseService.getExpenses();

        effect(() => {
          const expense = this.expenseService.expenses();
          if (expense.length > 0) {
            this.loadExpenseData(this.expenseId);
          }
        })
      }
    });
  }
  loadExpenseData(expenseId: number) {
    const expense = this.expenseService.getExpenseById(expenseId);
    console.log(expense);
if(expense){
  this.expenseForm.patchValue({
    title:expense.title,
    amount:expense.amount,
    category:expense.category,
    date:expense.date
  })
}


  }

  onSubmit() {
    console.log("Form Submitted");
    console.log(this.expenseForm);
    console.log(this.expenseForm.value);

    if (this.expenseForm.valid) {
      const expense: Expense = { ...this.expenseForm.value, id: this.expenseId || Date.now() }

      if (this.isEditMode && this.expenseId !== null) {
        // Edit an Existing Expense
        this.expenseService.updateExpense(this.expenseId.toString(), expense);
        this.snackBar.open("Expense Updated Successfully");
      } else {
        // Add new Expense
        this.expenseService.addExpense(expense);
        this.snackBar.open("Expense Added Successfully");
      }

      // Ensure UI is updated after changes
      

      this.router.navigate(["/dashboard"]);
    }


  }
}
