import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from '../recipes/recipes.component';



@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule
  ],
  exports: [RecipesComponent]
})
export class RecipesModule { }
