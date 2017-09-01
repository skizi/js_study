

import { Component, Input } from '@angular/core';


@Component({
  selector: 'sub-component',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent {

  text:string = 'subText';
  text2:string = 'subText2';
  _rootToSub:string;

  @Input() rootToSub:string;


  constructor() {}

  ngOnInit(): void {

  }




  ngAfterViewChecked(){
  //ngAfterContentChecked(){

  }


  subClick( e:any, _text ){
    this.text += this.rootToSub;
    console.log( e );
  }

}
