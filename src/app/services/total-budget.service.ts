import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalBudgetService {
  total!:number;

  constructor() { 
    this.total=0;
  }

 
  partialBudget(num1:number,num2:number){
    this.total = num1 * num2*30;
  }

  getPartialSum():number{
    return this.total;
  }

  getSum(num1:number,num2:number){
    return num1 + num2;
  }

  getSubstraction(num1:number,num2:number){
    return num1 - num2;
  }
 
}
