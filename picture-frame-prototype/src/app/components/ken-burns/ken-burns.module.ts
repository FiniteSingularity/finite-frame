import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KenBurnsComponent } from './ken-burns.component';



@NgModule({
  declarations: [KenBurnsComponent],
  imports: [
    CommonModule
  ],
  exports: [KenBurnsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KenBurnsModule { }
