import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pressupost';
  blnDisplayMenu:boolean=true;
  
  constructor(private router: Router){

 
}

/**
   * Check if the router url contains the specified route
   *
   * @param {string} route
   * @returns
   * @memberof MyComponent
   */
 hasRoute(route: string) {
  return this.router.url.includes(route);
}
}
