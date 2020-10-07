import React, {useState} from 'react';
import TodoList from './components/organisms/todo-list';
import Form from './components/organisms/form';
import CountApp from './components/organisms/count-app';


const App = () => {

  let [ state, setState ] = useState({
    todos: [
      {
        title: "Hello, React!",
        desc: "React始めました",
        done: false
      },
      {
        title: "Hello, Redux!",
        desc: "Reduxも始めました",
        done: false
      },
    ]
  });

  const toggleTodoHandler = ( index:number ) => {

    let todos = [ ...state.todos ];
    todos[index].done = !todos[index].done;
    setState( { todos:todos } );

  }


  const deleteHandler = ( index:number ) => {

    let todos = [ ...state.todos ];
    // todos = todos.filter(( item, _index )=>{
    //   return _index != index;
    // });
    todos.splice( index, 1 ); //スマートな書き方
    setState( { todos:todos } );

  }


  const addTodoHandler = ( title:string, text:string ) => {

    setState( { todos:state.todos.concat({
        title: title,
        desc: text,
        done: false
    }) } );

  }


  return (
    <div className="app">
      <h1>todoアプリを作ってみた</h1>
      <Form addTodoHandler={addTodoHandler} />
      <TodoList
        todos={state.todos}
        toggleTodoHandler={toggleTodoHandler}
        deleteHandler={deleteHandler}
        />

      <CountApp />
    </div>
  );
}

export default App;
