import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';
import Toastify from 'toastify-js'

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  total: number = 0;

  constructor(
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.loadDataIntoTable();
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(response => {
      // this.showSuccessToast('Gasto eliminado');
      this.expenses = this.expenses.filter(expense => expense.id != id);
      this.calculateTotal();
    });
  }

  private loadDataIntoTable(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.calculateTotal();
    });
  }

  private calculateTotal(): void {
    this.total = this.expenses.reduce((accumulated, currentValue) => {
      return accumulated + Number(currentValue.amount);
    }, 0);
  }

  private showSuccessToast(message: string): void {
    Toastify({
      text: message,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#189586",
      }
    }).showToast();
  }
}
