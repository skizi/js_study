import React, { Component } from 'react';


type Props = {
  id:number;
  title:string;
  done:boolean;
  desc:string;
  onClick:(id:number) => void;
  deleteHandler:(id:number) => void;
}

const Todo:React.FC<Props> = ( props:Props ) => {

  const className:string = 'undone';

  return(
    <li className={className}>
      <span>{props.id}</span>
      <span>：{props.title}　　</span>
      <button onClick={()=>props.onClick( props.id )}>{props.done ? '元に戻す' : '完了！'}</button>
      { props.done ? (<button onClick={()=>props.deleteHandler(props.id)}>削除</button>) : null }
      <p>{props.desc}</p>
    </li>
  );

}

export default Todo