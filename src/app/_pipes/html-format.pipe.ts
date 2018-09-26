import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'htmlFormat'})
export class HtmlFormatPipe implements PipeTransform {

  constructor() {
  }

  transform(str: string) {
    return str.replace(new RegExp('\n', 'g'), '<br/>');
  }
}
