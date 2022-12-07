import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TotalBudgetService } from 'src/app/services/total-budget.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {

  @Output() modifiedTotal = new EventEmitter<number>();

  @Output() numPageEvent = new EventEmitter<number>();
  @Output() numLangEvent = new EventEmitter<number>();

  public formPanell!: FormGroup;

  @Input() numPage!: number ;
  @Input() numLang!: number ;
  total: number = this.totalService.getPartialSum();

  regexOnlyNumbers = "[0-9]+";


  ngOnInit(): void {
    if(this.numPage == undefined){
      this.numPage = 0;
    }
    if(this.numLang == undefined){
      this.numLang = 0;
    }
  }

  constructor(private totalService: TotalBudgetService,
    private formBuilder: FormBuilder) {

    //Validations from reactive form
    this.formPanell = this.formBuilder.group({
      numPage: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.regexOnlyNumbers)]],
      numLang: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.regexOnlyNumbers)]]

    });
  }

  ejecutarnumPag(){
    this.numPageEvent.emit(this.numPage);
    this.totalService.partialBudget(this.numPage, this.numLang);
    this.modifiedTotal.emit(this.totalService.getPartialSum());
  }

  ejecutarnumLang(){
    this.numLangEvent.emit(this.numLang);
    this.totalService.partialBudget(this.numPage, this.numLang);
    this.modifiedTotal.emit(this.totalService.getPartialSum());
  }

  plus($e: any) {


    if ($e.target.id == 'plusPage') {
      this.numPage++;
    } else if ($e.target.id == 'plusLang') {
      this.numLang++;
    }else {
      this.numPage = this.formPanell.value.numPage;
      this.numLang = this.formPanell.value.numLang;
    }
    this.numPageEvent.emit(this.numPage);
    this.numLangEvent.emit(this.numLang);
    this.totalService.partialBudget(this.numPage, this.numLang);
    this.modifiedTotal.emit(this.totalService.getPartialSum());
  }

  minus($e: any) {
    if ($e.target.id == 'minusPage') {
      if (this.numPage >= 1) {
        this.numPage--;
      }
    } else if ($e.target.id == 'minusLang') {
      if (this.numLang >= 1) {
        this.numLang--;
      }
    }else {
      this.numPage = this.formPanell.value.numPage;
      this.numLang = this.formPanell.value.numLang;
    }
    this.numPageEvent.emit(this.numPage);
    this.numLangEvent.emit(this.numLang);
    this.totalService.partialBudget(this.numPage, this.numLang);
    this.modifiedTotal.emit(this.totalService.getPartialSum());
  }


  onChange(){
    this.totalService.partialBudget(this.numPage, this.numLang);
    this.modifiedTotal.emit(this.totalService.getPartialSum());
  }
}
