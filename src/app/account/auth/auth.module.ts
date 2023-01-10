import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { Login2Component } from './login2/login2.component';
import { Register2Component } from './register2/register.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';

import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedComponentModule } from 'src/app/shared/component/shared-component.module';

@NgModule({
  declarations: [Login2Component, PasswordresetComponent, Register2Component, Recoverpwd2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule,
    ToastrModule,
    SharedComponentModule
  ]
})
export class AuthModule { }
