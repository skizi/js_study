import React, { Component } from 'react';


type Props = {
  title:string;
  done:boolean;
  desc:string;
  index:number;
  toggleTodoHandler:(index:number) => void;
  deleteHandler:(index:number) => void;
}

const Todo:React.FC<Props> = ( props:Props ) => {

  const className:string = 'undone';

  return(
    <li className={className}>
      <span>{props.title}　　</span>
      <button onClick={()=>props.toggleTodoHandler( props.index )}>{props.done ? '元に戻す' : '完了！'}</button>
      { props.done ? (<button onClick={()=>props.deleteHandler(props.index)}>削除</button>) : null }
      <p>{props.desc}</p>
    </li>
  );

}

export default Todo