import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';


//Injectableとは他のコンポーネントから最新データのインスタンスが受け取れるようにする
@Injectable()
export class TestService {

  private headers = new Headers({'Content-Type': 'application/xml'});




  constructor(private http: Http) {}


  getHttp( url:string ){

    const params = new HttpParams().set( 'myParameter', '99' )
    return this.http.get( url, { params } )
               .toPromise()
               .then(function(response:any){ return response; })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
