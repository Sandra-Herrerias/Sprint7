import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from 'src/app/models/budget';
import { TotalBudgetService } from 'src/app/services/total-budget.service';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})

export class PressupostListComponent {

  budgets$!:Observable<Budget[]>;
  budgetsStored!:Array <Budget>;

  sortName!: string;
  sortValue!: string;
 
  constructor(
    private totalService: TotalBudgetService
  ) { }

  ngOnInit() {
    this.budgets$ = this.totalService.getBudgets$();
    this.budgets$.subscribe(budgetsStored => this.budgetsStored = budgetsStored); 
  }


  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    
  }
}
