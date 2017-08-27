import { Component } from '@angular/core';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  
  text:string = '1111';

  setText( text ) {
  	console.log(text);
  	this.text = text;
  }

  popupClick(){

  }
}
