import React, { Component } from 'react';
import Todo from '../molecules/todo';

type Props = {
  todos : {
    id:number,
    title:string,
    desc:string,
    done:boolean
  }[],
  onClick:(id:number) => void;
  deleteHandler:(id:number) => void;
}


const TodoList:React.FC<Props> = (props:Props) => {

  return(
    <ul>
      {props.todos.map( todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={props.onClick}
          deleteHandler={props.deleteHandler}
        />
      )}
    </ul>
  );
}

export default TodoList