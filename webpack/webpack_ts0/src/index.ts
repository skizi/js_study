import { Hoge } from "./Hoge";

class Main{

	constructor(){

		new Hoge();

	}


	public hoge( name:string ):void{

		alert( name );

	}

}


var main:Main = new Main();
main.hoge( "1" );