import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class TotalBudgetService {
  partialTotal!: number;
  budgetsStored!: Budget[];

  private allBudgets$ = new Subject<Budget[]>();

  constructor() {
    this.partialTotal = 0;
    this.budgetsStored = [];
  }

  partialBudget(num1: number, num2: number) {
    this.partialTotal = num1 * num2 * 30;
  }

  getPartialSum(): number {
    return this.partialTotal;
  }

  getSum(num1: number, num2: number) {
    return num1 + num2;
  }

  getSubstraction(num1: number, num2: number) {
    return num1 - num2;
  }

  addNewBudget(budget: Budget) {

    this.budgetsStored = JSON.parse(localStorage.getItem('budgets')!);
    let newId = 1;

    if (this.budgetsStored != null) {
     
      this.budgetsStored.sort((a, b) => a.id < b.id ? -1 : 1);

      newId = this.budgetsStored.slice(-1)[0].id;
      console.log(newId);
      newId++;
     
    }else{
      this.budgetsStored = [];
    }

    budget.id = newId;
    this.budgetsStored.push(budget);

    localStorage.setItem('budgets', JSON.stringify(this.budgetsStored));

    this.allBudgets$.next(this.budgetsStored);
  }

  getBudgets$(): Observable<Budget[]> {
    return this.allBudgets$.asObservable();
  }
}
