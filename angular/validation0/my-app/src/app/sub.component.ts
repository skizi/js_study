import { Component, Input } from '@angular/core';

@Component({
  selector: 'sub-component',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css']
})
export class SubComponent {

  @Input() title:string;

}
