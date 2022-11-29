import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if(arg == '' ) return value;
    const resultBudgets = [];
    for(const item of value){
      if(item.budget_name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultBudgets.push(item);
      };
    };
    return resultBudgets;
  }

}
