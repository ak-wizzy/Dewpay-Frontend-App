import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';
import { UIModule } from '../ui/ui.module';



@NgModule({
  declarations: [PreLoaderComponent],
  imports: [
    CommonModule,
    UIModule
  ],
  exports: [PreLoaderComponent]
})
export class SharedComponentModule { }
