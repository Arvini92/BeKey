import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  transform(value: any, args?: any): SafeResourceUrl  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
