import { Component, ViewChild } from '@angular/core';
import { TestService } from './test.service';
import { SubComponent } from './sub.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name = '';
  rootToSubText = 'ルートからのテキスト';
  colspanLength = 2;

  constructor( private testService:TestService ) {}

  @ViewChild(SubComponent)
  private subComponent: SubComponent;




  ngOnInit(): void {
    this.testService.getHttp( 'http://blog.livedoor.jp/itsoku/index.rdf' )
      .then( responce => {

        var xmlStr = responce._body;
        //console.log( xmlStr );
        // var items:JQuery = $( xmlStr ).find( 'item' );
        // for( var i = 0; i < items.length; i++ ){
        //   var item:JQuery = $( $( items[i] ).context );
        //   var title:string = item.find( 'title' ).text();
        //   var description:string = item.find( 'description' ).text();
        //   //var content:string = item[0].textContent;
        //   var content:string = item[0].innerHTML;
        //   var url:string = item.attr( 'rdf:about' );
        //   this.newses[i] = new News( title, description, content, url );
        // }

      });

  }


  //コンポーネントがチェックされるたびに実行
  ngAfterViewChecked(){

      //console.log( this.subComponent.rootToSub );

  }


  setValue(){
    this.name = 'Nancy';
  }


  exBtnClick( name:string ){

    console.log( name );

  }

}
