import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AddFreelanceComponent } from './features/freelancer/add-freelance/add-freelance.component';
import { DataFreelanceComponent } from './features/freelancer/data-freelance/data-freelance.component';
import { DataTablesModule } from "angular-datatables";
import { ModalModule } from 'ngx-bootstrap/modal'; 

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AddFreelanceComponent,
    DataFreelanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule ,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
