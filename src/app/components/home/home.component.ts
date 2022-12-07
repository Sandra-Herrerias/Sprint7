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
  total!: string[];
  arrayNumbers: number[] = [];
  result!: number;
  totalBudget!: number;
  totalProject: number = 0;
  panellnums!: number;
  servicesChecked: Array<string> = [];
  showListBudgets: boolean = false;

  numPage: number = 0;
  numLang: number = 0;

  public user_name:string = '';
  public budget_name:string = '';
  public selectedPrices:Array<string>= [];
  public checkboxChecked:Array<string>= [];

  public webSelected: boolean = false;
  public seoSelected: boolean = false;
  public adsSelected: boolean = false;
  public totalPrice!: number;

  checkedItems: any = [];

  offeredServices: Array<any> = [
    { id: 'web', name: 'Una pàgina web (500€)', value: 500, checked: false},
    { id: 'seo', name: 'Una consultoria SEO (300€)', value: 300, checked: false},
    { id: 'ads', name: 'Una campanya de Google Ads (200€)', value: 200, checked: false}
  ];
 

  constructor(private formBuilder: FormBuilder,
    private totalService: TotalBudgetService,
    private router:Router,
    private route: ActivatedRoute,
    private location:Location) {
    this.form = this.formBuilder.group({
      selectedPrices: this.formBuilder.array([]),
      budget_name: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      numPage:[''],
      numLang:[''],
      webSelected:[''],
      seoSelected:[''],
      adsSelected:[''],
      checkboxChecked:[''],
      totalPrice:this.sumProject()
    });
  }


  getTotal($initialTotal: number) {
    return this.panellnums = $initialTotal;
  }

  ngOnInit(){
    this.totalPrice=0;
    this.form.valueChanges.subscribe((value) => {
      const urlTree = this.router.createUrlTree(['/home'], {
        relativeTo: this.route,
        queryParams: {
          budget_name:value.budget_name,
          user_name: value.user_name,
          numPage: value.numPage,
          numLang: value.numLang,
          webSelected: value.webSelected,
          seoSelected: value.seoSelected,
          adsSelected: value.adsSelected,
          totalPrice:this.sumProject()
        },
        queryParamsHandling: 'merge',
      });
      this.location.go(urlTree.toString());
    });

    this.route.queryParams.subscribe(
      queryParam => {
        this.user_name = queryParam['user_name'];
        this.budget_name = queryParam['budget_name'];
        this.numPage = queryParam['numPage'];
        this.numLang = queryParam['numLang'];
        this.webSelected = queryParam['webSelected'];
        this.seoSelected = queryParam['seoSelected'];
        this.adsSelected = queryParam['adsSelected'];
        this.totalPrice = queryParam['totalPrice'];
        
        const pricesArray = this.route.snapshot.queryParamMap.get('selectedPrices');
        if (pricesArray === null) {
          this.selectedPrices = new Array<string>();
        } else {
          this.selectedPrices = JSON.parse(pricesArray);
        }
      }
    )

    console.log(this.webSelected);
    console.log(this.seoSelected);
    console.log(this.adsSelected);

   }

  onSubmit(form: FormGroup) {
    this.showListBudgets= true;
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
      alert("Pressupost creat correctament");
      this.totalService.addNewBudget(newBudget);
      
    } else {
      alert("Pressupost no creat, empleni la informació necessaria");
    }
  }
  /**
   * Function that gets values selected and puts them into a new array
   * @param event 
   */
  checkValue(event: any) {
    //values from form
    const selectedPrices: FormArray = this.form.get('selectedPrices') as FormArray;

    if (event.target.checked) {//add values selected to array
      selectedPrices.push(new FormControl(event.target.value));
      this.servicesChecked.push(event.target.name);

      if (event.target.id === "web") {
        this.webSelected = true;
      }else if (event.target.id === "seo") {
        this.seoSelected = true;
      }else if (event.target.id === "ads") {
        this.adsSelected = true;
      }

    } else {//delete values unselected to array
      const index = selectedPrices.controls.findIndex(x => x.value === event.target.value);
      selectedPrices.removeAt(index);

      this.servicesChecked.forEach((element, index) => {
        if (element == event.target.name) this.servicesChecked.splice(index, 1);
      });

      if (event.target.id === "web") {
        this.totalService.partialTotal = 0;
        this.webSelected = false;
      }else if (event.target.id === "seo") {
        this.seoSelected = false;
      }else if (event.target.id === "ads") {
        this.adsSelected = false;
      }
    }

    //add values to new array
    this.total = Array.from(selectedPrices.value);

    this.arrayNumbers = this.convertArrStringToArrNum(this.total);
    this.totalBudget = this.totalSum(this.arrayNumbers);

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

  clear() {
    localStorage.removeItem('budgets');
  }


  getNumPage(e: any) {
    this.numPage=e;
  }
  getNumLang(e: any) {
    this.numLang=e;
  }
}
