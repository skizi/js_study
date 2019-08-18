import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0], age:17, postalcode:'110-0016'};

}
