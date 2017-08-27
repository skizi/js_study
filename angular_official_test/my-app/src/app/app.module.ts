import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { SubComponent } from './sub.component';

import { TestService }          from './test.service';

@NgModule({
  declarations: [
    AppComponent,
    SubComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
