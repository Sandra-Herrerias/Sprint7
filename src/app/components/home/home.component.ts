import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TotalBudgetService } from 'src/app/services/total-budget.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  title = new BehaviorSubject(0);

  showPanell: boolean = false;

  total!: string[];
  arrayNumbers: number[] = [];
  result!: number;
  totalBudget!: number;

  totalWeb: number = 0;

  panellnums!: number;

  Data: Array<any> = [
    { id: 'web', name: 'Una pàgina web (500€)', value: 500 },
    { id: 'seo', name: 'Una consultoria SEO (300€)', value: 300 },
    { id: 'ads', name: 'Una campanya de Google Ads (200€)', value: 200 }
  ];

  constructor(private formBuilder: FormBuilder, private totalService: TotalBudgetService) {
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    });

  }

  getTotal($initialTotal: number) {
    console.log("$e  " + $initialTotal);
    console.log("res+e  " + (this.result + $initialTotal));
    console.log("B   " + this.panellnums);

    //this.totalWeb = this.result + $initialTotal;
    this.totalWeb = this.totalService.getTotalSum() + this.result;
    this.panellnums = $initialTotal;
    console.log("B   " + this.panellnums);
    console.log("TOTAL WEB    " + this.totalWeb);
    console.log($initialTotal);
  }

  ngOnInit(): void { }

  /**
   * Function that gets values selected and puts them into a new array
   * @param event 
   */
  checkValue(event: any) {
    //values from form
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (event.target.checked) {//add values selected to array
      checkArray.push(new FormControl(event.target.value));

      let num: string = event.target.value;
      console.log(parseInt(num));
      let nums: number = parseInt(num);
      console.log(this.result);
      console.log(event.target.value);
      console.log(this.totalWeb);
      this.totalWeb = this.totalWeb + nums;
      console.log(this.totalWeb);

    } else {//delete values unselected to array
      const index = checkArray.controls.findIndex(x => x.value === event.target.value);
      checkArray.removeAt(index);
      let num: string = event.target.value;
      console.log(parseInt(num));
      let nums: number = parseInt(num);
      this.totalWeb = this.totalWeb - nums;

      if (event.target.id === "web") {
        this.totalWeb =  this.totalWeb - this.panellnums;
      }
    }




    //add values to new array
    this.total = Array.from(checkArray.value);

    this.arrayNumbers = this.convertArrStringToArrNum(this.total);
    this.totalBudget = this.totalSum(this.arrayNumbers);

    //if web id is selected
    this.showPanellChild(event);
  }


  /**
   * Function that converts an string array to a numbers array
   * @param numbers 
   * @returns array converted to a numbers array
   */
  convertArrStringToArrNum(numbers: string[]) {
    //convert string array to number array
    const arrOfNum = numbers.map(str => {
      return Number(str);
    });
    return arrOfNum;
  }


  /**
   * Function that sums up each number from array
   * @param numbers 
   * @returns numbers sum
   */
  totalSum(numbers: number[]) {
    //sum numbers array
    this.result = numbers.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
    return this.result;
  }


  /**
   * Function that shows child component in case id were web
   * @param event 
   */
  showPanellChild(event: any) {
    if (event.target.id == 'web' && event.target.checked) {
      this.showPanell = true;
    } else if (event.target.id == 'web' && !event.target.checked) {
      this.showPanell = false;
    }
  }

}
