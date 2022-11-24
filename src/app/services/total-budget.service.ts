import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalBudgetService {
  partialTotal!:number;

  constructor() { 
    this.partialTotal=0;
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
 
}
