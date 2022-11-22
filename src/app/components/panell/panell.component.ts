import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {


  numPage: number = 1;
  numLang: number = 1;
  total!:number;
  constructor() {


  }

  ngOnInit(): void {

  }


  plus($e: any) {
    console.log($e.target.id);
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

  totalSum(){
    console.log(this.numPage);
    console.log(this.numLang);
    console.log("TOTAL: "+this.numLang * this.numPage*30);

    this.total = this.numLang * this.numPage*30;
    return this.total;
  }

}
