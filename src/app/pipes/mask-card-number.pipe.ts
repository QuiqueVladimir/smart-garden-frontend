import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'maskCardNumber'
})
export class MaskCardNumberPipe implements PipeTransform {
  transform(cardNumber: string): string {
    return cardNumber.replace(/\d(?=\d{4})/g, '*');
  }
}
