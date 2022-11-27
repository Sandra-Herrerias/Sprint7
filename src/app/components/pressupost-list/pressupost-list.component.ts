import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { TotalBudgetService } from 'src/app/services/total-budget.service';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent {


  constructor(
    private totalService: TotalBudgetService
  ) { }

  ngOnInit() {
  }



}
