import React, {useState} from 'react';
import TodoList from './components/organisms/todo-list';
import Form from './components/organisms/form';
import CountApp from './components/organisms/count-app';


const App = () => {

  let [ state, setState ] = useState({
    todos: [
      {
        id: 1,
        title: "Hello, React!",
        desc: "React始めました",
        done: false
      },
      {
        id: 2,
        title: "Hello, Redux!",
        desc: "Reduxも始めました",
        done: false
      },
    ]
  });

  const switchTodoHandler = ( id:number ) => {

    let todos = [ ...state.todos ];
    todos.map(( item, _index )=>{
      if( item.id == id ) item.done = !item.done;
      return item;
    });
    setState( { todos:todos } );

  }


  const deleteHandler = ( id:number ) => {

    let todos = [ ...state.todos ];
    todos = todos.filter(( item, _index )=>{
      return item.id != id;
    });
    todos = todos.map(( item, _index )=>{
      item.id = _index+1;
      return item;
    });
    setState( { todos:todos } );

  }


  const addTodoHandler = ( title:string, text:string ) => {

    let todos = [ ...state.todos ];
    console.log(title);
    todos.push({
        id: todos.length+1,
        title: title,
        desc: text,
        done: false
    });
    setState( { todos:todos } );

  }


  return (
    <div className="app">
      <h1>todoアプリを作ってみた</h1>
      <Form addTodoHandler={addTodoHandler} />
      <TodoList
        todos={state.todos}
        onClick={switchTodoHandler}
        deleteHandler={deleteHandler}
        />

      <CountApp />
    </div>
  );
}

export default App;
