import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {  MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-expense-grid',
  imports: [RouterModule,MatTableModule,MatSnackBarModule,MatPaginatorModule,MatButtonModule,MatCardModule],
  templateUrl: './expense-grid.component.html',
  styleUrl: './expense-grid.component.css'
})
export class ExpenseGridComponent {
  expenseService=inject(ExpenseService);
  snackbar=inject(MatSnackBar);
  displayedColumns:string[]=["id","title","category","amount","date","actions"];
  dataSource=new MatTableDataSource<Expense>();
  totalItems:number=0;
  pageSize:number=10;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  expenses= this.expenseService.expenses;
  /**
   *
   */
  constructor() {
    this.expenseService.getExpenses();

    effect(()=>{
      const expenses=this.expenses();
      this.dataSource.data=expenses;
      this.totalItems=expenses.length;

    })
    

    
  }
  onPageChange(event:any){
      this.pageSize=event.pageSize;
      this.dataSource.paginator=this.paginator;
  }
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }

  deleteExpense(expenseId:number){
    this.expenseService.deleteExpense(expenseId);
    this.snackbar.open("Expense Deleted Successfully");

  }
}
