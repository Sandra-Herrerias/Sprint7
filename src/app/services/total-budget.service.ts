import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class TotalBudgetService {
  partialTotal!:number;
  budgetsStored!:Budget[];


  private allBudgets$ = new Subject<Budget[]>();

  constructor() { 
    this.partialTotal=0;
    this.budgetsStored = [];

   
  }

 
  partialBudget(num1:number,num2:number){
    this.partialTotal = num1 * num2*30;
  }

  getPartialSum():number{
    return this.partialTotal;
  }

  getSum(num1:number,num2:number){
    return num1 + num2;
  }

  getSubstraction(num1:number,num2:number){
    return num1 - num2;
  }

  addNewBudget(budget:Budget){
   
   
    this.budgetsStored.push(budget);
    this.allBudgets$.next(this.budgetsStored);
    console.log(this.budgetsStored);
    localStorage.setItem('budgets',JSON.stringify(this.budgetsStored)); 
    this.budgetsStored = JSON.parse(localStorage.getItem('budgets')!);

    console.log("SERVICE" + JSON.stringify(this.budgetsStored));
  }

  getBudgets$(): Observable<Budget[]>{
    return this.allBudgets$.asObservable();
  }




}
