import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskCardNumberPipe } from '../pipes/mask-card-number.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaskCardNumberPipe],
  exports: [MaskCardNumberPipe]
})
export class SharedModule {}
