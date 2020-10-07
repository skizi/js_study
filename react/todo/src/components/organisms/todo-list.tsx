import React, { Component } from 'react';
import Todo from '../molecules/todo';

type Props = {
  todos : {
    title:string,
    desc:string,
    done:boolean
  }[],
  toggleTodoHandler:(index:number) => void;
  deleteHandler:(index:number) => void;
}


const TodoList:React.FC<Props> = (props:Props) => {

  return(
    <ul>
      {props.todos.map(( todo, index ) =>
        <Todo
          key={index}
          {...todo}
          index = {index}
          toggleTodoHandler={props.toggleTodoHandler}
          deleteHandler={props.deleteHandler}
        />
      )}
    </ul>
  );
}

export default TodoList