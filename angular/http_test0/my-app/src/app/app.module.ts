import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { SubComponent } from './sub.component';
import { TestService } from './test.service';

@NgModule({
  declarations: [
    AppComponent,
    SubComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule
  ],

  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
