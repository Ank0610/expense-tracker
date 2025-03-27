import { Routes } from '@angular/router';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';
import { ExpenseGridComponent } from './expense-grid/expense-grid.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'add-expense', component:ExpenseAddEditComponent},
    {path:'dashboard', component:ExpenseGridComponent},
    {path:'list', component:ExpenseListComponent},
    {path:'edit/:id',component:ExpenseAddEditComponent},
    {path:'contact',component:ContactComponent},
    {path:'home',component:HomeComponent}

    //404 not found
    //wild card

];
