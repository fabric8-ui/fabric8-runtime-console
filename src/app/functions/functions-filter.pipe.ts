import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'functionsFilter'})
export class FunctionsFilterPipe implements PipeTransform {
  transform = () => null;
}
