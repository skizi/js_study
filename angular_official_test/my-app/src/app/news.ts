export class News {
  id: number;
  title: string;
  description: string;
  content:string;

  constructor( title:string, description:string, content:string ){
  	this.title = title;
  	this.description = description;
  	this.content = content;
  }
}
