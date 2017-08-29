/// <reference path="../typings/globals/jquery/index.d.ts" />

import { Component, Input, Output, AfterViewInit, AfterViewChecked, EventEmitter } from '@angular/core';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements AfterViewInit, AfterViewChecked {

  private _newsText:string;


  public show(){
  	$('#popup').show();
  }


  @Input()
  set newsText(newsText: string) {
  	
  	this._newsText = newsText;

  }


  get newsText(): string {
    return this._newsText.toUpperCase();
  }


  ngAfterViewInit(){
  	
  	$( '#popup' ).hide();

  }


  ngAfterViewChecked(){

  	var popup = $('#popup');
  	var x = -popup.width() * .5;
  	var y = -popup.height() * .5;
  	popup.css({ marginLeft : x + 'px', marginTop : y + 'px' });

  }


  @Output() hidePopup = new EventEmitter<boolean>();
  closeBtnClick(){
  	$('#popup').hide();
    this.hidePopup.emit();
  }

}
