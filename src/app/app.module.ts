import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SlotsComponent } from './slots/slots.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxNotificationModule } from 'ngx-notification';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SlotsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    NgxNotificationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
