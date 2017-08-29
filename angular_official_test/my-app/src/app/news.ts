export class News {
  id: number;
  title: string;
  description: string;
  content:string;
  url:string;

  constructor( title:string, description:string, content:string, url:string ){
  	this.title = title;
  	this.description = description;
  	this.content = content;
  	this.url = url;
  }
}
