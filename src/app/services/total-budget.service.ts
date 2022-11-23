import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalBudgetService {
  total!:number;
  constructor() { 
    this.total=0;
  }

 
  totalBudget(num1:number,num2:number){
    this.total = num1 * num2*30;
    
  }

  getTotalSum():number{
    return this.total;
  }

  
}
