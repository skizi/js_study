import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import { Hero } from './hero';

@Injectable()
export class TestService {

  private headers = new Headers({'Content-Type': 'application/xml'});
  private heroesUrl = 'http://blog.livedoor.jp/itsoku/index.rdf';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(){
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(function(response:any){ return response._body; })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}