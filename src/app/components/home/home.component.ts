import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators} from '@angular/forms';
import { TotalBudgetService } from 'src/app/services/total-budget.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  form!: FormGroup;

  showPanell: boolean = false;

  total!: string[];
  arrayNumbers: number[] = [];
  result!: number;
  totalBudget!: number;

  totalProject: number = 0;

  panellnums!: number;

  servicesChecked: Array<string> = [];

  
 

  Data: Array<any> = [
    { id: 'web', name: 'Una pàgina web (500€)', value: 500 },
    { id: 'seo', name: 'Una consultoria SEO (300€)', value: 300 },
    { id: 'ads', name: 'Una campanya de Google Ads (200€)', value: 200 }
  ];
 

  constructor(private formBuilder: FormBuilder,
    private totalService: TotalBudgetService,
    private router:Router,
    private route: ActivatedRoute,
    private location:Location) {
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([]),
      budget_name: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      checkboxChecked:['']
    });
  }


  getTotal($initialTotal: number) {
    return this.panellnums = $initialTotal;
  }


  public user_name:string = '';
  public budget_name:string = '';
  public checkArray:string = '';
  ngOnInit(){
    
    this.form.valueChanges.subscribe((value) => {
      console.log('fetch data with new value', value);

      const urlTree = this.router.createUrlTree(['/home'], {
        relativeTo: this.route,
        queryParams: {
          budget_name:value.budget_name,
          user_name: value.user_name,
          checkArray: value.checkArray
        },
        queryParamsHandling: 'merge',
      });
      console.log(urlTree.queryParams['budget_name']);
      console.log(urlTree.queryParams['user_name']);
      console.log(urlTree.queryParams['checkArray']);
  
      this.location.go(urlTree.toString());
    });

    this.route.queryParams.subscribe(
      queryParam => {
        this.user_name = queryParam['user_name'];
        this.budget_name = queryParam['budget_name'];
        this.checkArray = queryParam['checkArray'];
console.log(queryParam['budget_name']);
console.log(queryParam['user_name']);
console.log(queryParam['checkArray']);
      }
    )
   }

  onSubmit(form: FormGroup) {
    let today = new Date();
    let date = today.toLocaleString("es-ES");

    //create array without reference
    const clonedArray: Array<string> = [];
    this.servicesChecked.forEach(val => clonedArray.push(val));

    //validate form is not empty
    if (form.valid && this.servicesChecked.length != 0 && this.sumProject() != 0) {

      let newBudget = {
        id:0,
        budget_name: form.value.budget_name,
        user_name: form.value.user_name,
        services_selected: clonedArray,
        total_price: this.sumProject(),
        date: date
      };
      //alert("Pressupost creat correctament");
      this.totalService.addNewBudget(newBudget);
    } else {
      //alert("Pressupost no creat, empleni la informació necessaria");
    }
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
      this.servicesChecked.push(event.target.name);

    } else {//delete values unselected to array
      const index = checkArray.controls.findIndex(x => x.value === event.target.value);
      checkArray.removeAt(index);

      this.servicesChecked.forEach((element, index) => {
        if (element == event.target.name) this.servicesChecked.splice(index, 1);
      });

      if (event.target.id === "web") {
        this.totalService.partialTotal = 0;
      }
    }

    //add values to new array
    this.total = Array.from(checkArray.value);

    this.arrayNumbers = this.convertArrStringToArrNum(this.total);
    this.totalBudget = this.totalSum(this.arrayNumbers);

    //if web id is selected
    this.showPanellChild(event);
  }

  sumProject() {
    if (!isNaN(this.totalService.getPartialSum()) && !isNaN(this.totalBudget))
      return this.totalService.getPartialSum() + this.totalBudget;
    else return 0;
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
  clear() {
    localStorage.removeItem('budgets');
  }
}
