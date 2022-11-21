import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  form = new FormGroup({
    webForm: new FormControl(''),
    seoForm: new FormControl(''),
    adsForm: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {

  }


  check(event:any){
    console.log(event.checked)
  }
 

}
