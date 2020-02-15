import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {


    constructor( private domSanizer: DomSanitizer) {}

  transform( img: string): any {



    const domImg = `background-image: url(${ img })`;

    return this.domSanizer.bypassSecurityTrustStyle( domImg );
  }

}
