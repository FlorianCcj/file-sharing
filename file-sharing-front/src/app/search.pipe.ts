import { Pipe, PipeTransform } from '@angular/core';
import {FilesService} from './files.service'

@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  constructor(private filesService: FilesService) {}

  transform(value: any[], pattern: string): any[] {
    if (typeof(pattern) === typeof('')) {
      return this.filesService.filterListOfFile(value, pattern);;
      // return value.filter((entity) => {
      //   return entity.id.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
      // });
    } else {
      return value;
    }
  }
}