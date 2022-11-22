import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalBudgetService {

  constructor() { }

 
  totalBudget(num1:number,num2:number){
    let total = num1 * num2*30;
    return total;
  }
}
