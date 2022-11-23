import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TotalBudgetService } from 'src/app/services/total-budget.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {

  @Output() modifiedTotal = new EventEmitter<number>();

  public formPanell!: FormGroup;

  numPage: number = 0;
  numLang: number = 0;
  total!: number;

  regexOnlyNumbers = "[0-9]+";

  constructor(private totalService: TotalBudgetService,
    private formBuilder: FormBuilder) {

    //Validations from reactive form
    this.formPanell = this.formBuilder.group({
      numPage: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.regexOnlyNumbers)]],
      numLang: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.regexOnlyNumbers)]]

    });
  }

  ngOnInit(){ 
    this.modifiedTotal.emit(this.totalSum());
  }

  plus($e: any) {
    if ($e.target.id == 'plusPage') {
      this.numPage++;
    } else if ($e.target.id == 'plusLang') {
      this.numLang++;
    }
  }

  minus($e: any) {
    if ($e.target.id == 'minusPage') {
      if (this.numPage > 1) {
        this.numPage--;
      }
    } else if ($e.target.id == 'minusLang') {
      if (this.numLang > 1) {
        this.numLang--;
      }
    }

  }


  totalSum() {

    this.total = this.totalService.totalBudget(this.numPage, this.numLang);
    
    return  this.total;
  }
  
  /**
   * Function used to emit information to father component
   */
 emitTotal(){
    this.modifiedTotal.emit(this.totalSum());
  }

}
