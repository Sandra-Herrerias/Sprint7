import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class TotalBudgetService {
  partialTotal!:number;
  budgetsStored!:Budget[];

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

  setBudgetsStored(budgetsStored: Budget[]){
    return this.budgetsStored = budgetsStored;
  }

  getBudgetsStored(): Budget[]{
    return this.budgetsStored;
  }
 
}
