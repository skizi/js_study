import { Component } from '@angular/core';

@Component({
  selector: 'sub-component',
  templateUrl: './sub.component.html'
})
export class SubComponent {
  title = 'app';

  subClick(){
  	alert("sub");
  }
}
