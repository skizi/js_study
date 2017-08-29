/// <reference path="../typings/globals/jquery/index.d.ts" />

import { Component, ViewChild } from '@angular/core';
import { TestService } from './test.service';
import { News } from './news';
import { PopupComponent } from './popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  @ViewChild(PopupComponent)
  private popupComponent: PopupComponent;

  title = 'app';
  newsText = '222';

  newses: News[] = [];


  constructor( private testService:TestService ) {
  }

  subClick(){
  	alert( "main" );
  }

  ngOnInit(): void {
    this.testService.getHeroes()
      .then( xmlStr => {

      	var items:JQuery = $( xmlStr ).find( 'item' );
      	for( var i = 0; i < items.length; i++ ){
      		var item:JQuery = $( $( items[i] ).context );
      		var title:string = item.find( 'title' ).text();
      		var description:string = item.find( 'description' ).text();
      		var content:string = item[0].textContent;
      		this.newses[i] = new News( title, description, content );
      	}
      });
  }


  newsClick( news ){
  	this.newsText = news.content;
  	this.popupComponent.show();
  }


  hidePopup(){
  	console.log( 'popup close' );
  }

}
