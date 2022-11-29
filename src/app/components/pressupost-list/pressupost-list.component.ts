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
  myClonedObject!:Array <Budget>;

  sortName!: string;
  sortValue!: string;
 
  constructor(
    private totalService: TotalBudgetService
  ) {}

  ngOnInit() {
    this.budgets$ = this.totalService.getBudgets$();
    this.budgets$.subscribe(budgetsStored => this.budgetsStored = budgetsStored);  
    console.log(this.budgetsStored);
    this.myClonedObject = Object.assign({}, this.budgetsStored );

    console.log(this.myClonedObject);
  }


getBudgetByName(): void {
  if(this.budgetsStored != null){
  this.budgetsStored.sort((a,b) => a.user_name < b.user_name ? -1:1 );
  }
  
}

getBudgetByDate(){
  if(this.budgetsStored != null){
  //this.budgetsStored.sort((a, b) => {return <any>new Date(b.date) - <any>new Date(a.date);});
  this.budgetsStored.sort((a, b) => b.date < a.date ? -1:1);
  }
}

getbackOriginalData(){  
  if(this.budgetsStored != null){
  this.budgetsStored.sort((a,b) => a.id < b.id ? -1:1 );
  }
}

}
