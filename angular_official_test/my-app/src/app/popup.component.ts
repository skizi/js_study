/// <reference path="../typings/globals/jquery/index.d.ts" />

import {
  Component,
  Input,
  Output,
  AfterViewInit,
  AfterViewChecked,
  EventEmitter } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import{ utils } from './utils'


@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [ trigger('visibleState', [
      state('show', style({ opacity: 1, transform: 'translateY(0px)' }) ),
      state('hide', style({ opacity: 0, transform: 'translateY(-20px)' }) ),
      transition('hide => show', animate('.3s ease-in')),
      transition('show => hide', animate('.3s ease-out')) ]),

	  trigger('bgVisibleState', [
      state('show', style({ opacity: 1 }) ),
      state('hide', style({ opacity: 0 }) ),
      transition('hide => show', animate('.3s linear')),
      transition('show => hide', animate('.3s linear')) ])
  ],
})
export class PopupComponent implements AfterViewInit, AfterViewChecked {
  
  private element:any;
  private bg:any;
  private _newsText:string;
  private _newsUrl:string;
  public animState : string = 'hide';
  private myStyles = { display:'none', marginLeft:'0px', marginTop:'0px' }


  public show(){

    this.animState = 'show';

  }


  //newsTextのgetter setter
  @Input()
  set newsText(newsText: string) {

  	this._newsText = newsText;

  }


  get newsText(): string {

    return this._newsText;

  }


  @Input()
  set newsUrl(newsUrl: string) {

  	this._newsUrl = newsUrl;

  }


  get newsUrl(): string {

    return this._newsUrl;

  }


  //DOMが初期化されたら一度だけ実行
  ngAfterViewInit(){

    this.animState = 'hide';
    this.element = document.getElementById( 'popup' );
    this.bg = document.getElementById( 'popupBg' );

  }


  //DOMが更新されたら実行
  ngAfterViewChecked(){

    var size = utils.getSize( this.element );
    var x = -size.width * .5;
    var y = -size.height * .5;
    this.myStyles.marginLeft = x + 'px';
    this.myStyles.marginTop = y + 'px';

  }


  //イベント送出
  @Output() hidePopup = new EventEmitter<boolean>();
  closeBtnClick(){
    this.animState = 'hide';
    this.hidePopup.emit();
  }


  //フェードイン、フェードアウトのアニメーション
  animationStarted( e ){

    if( e.toState == 'show' ){
    	this.myStyles.display = 'block';
    	this.bg.style.display = 'block';
    }

  }


  animationDone( e ){

    if( e.toState == 'hide' ){
    	this.myStyles.display = 'none';
    	this.bg.style.display = 'none';
    }

  }

}
