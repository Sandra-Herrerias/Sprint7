import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  form!: FormGroup;

  showPanell: boolean = false;

  total!: string[];
  arrayNumbers: number[] = [];
  result!: number;
  totalBudget!: number;

  totalWeb!: number;

  a!:any;
  b!:any;

  Data: Array<any> = [
    { id: 'web', name: 'Una pàgina web (500€)', value: 500 },
    { id: 'seo', name: 'Una consultoria SEO (300€)', value: 300 },
    { id: 'ads', name: 'Una campanya de Google Ads (200€)', value: 200 }
  ];

  constructor(private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) {
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    });

  }

  getTotal($e: any) {
    console.log($e);
    console.log(this.result + $e);

    this.b=$e;
    /*setTimeout(()=>{
      this.totalWeb = this.result + this.b;
     },0);*/
     //this.cdRef.detectChanges();
    console.log(this.b);
    console.log($e);
  }

//NG0100: Expression has changed after it was checked
//https://www.mattspaulding.org/The-Curious-Case-of-Angular-and-the-Infinite-Change-Event-Loop/

  ngAfterViewInit() {
   //Promise.resolve().then(()=>this.totalWeb = this.result + this.b);
   /*setTimeout(()=>{
    this.totalWeb = this.result + this.b;
   },0);*/
   console.log(this.result + this.b);
   console.log(this.totalWeb);
  }


  ngOnInit(): void {
  
  }

  /**
   * Function that gets values selected and puts them into a new array
   * @param event 
   */
  checkValue(event: any) {
    //values from form
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (event.target.checked) {//add values selected to array
      checkArray.push(new FormControl(event.target.value));

    } else {//delete values unselected to array
      const index = checkArray.controls.findIndex(x => x.value === event.target.value);
      checkArray.removeAt(index);
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
