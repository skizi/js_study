import React, {useState} from 'react';
import TodoList from './components/organisms/todo-list';


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
    let newTodos = todos.filter(( item, _index )=>{
      return item.id != id;
    });
    setState( { todos:newTodos } );

  }

  return (
    <div className="app">
      <h1>todoアプリを作ってみた</h1>
      <TodoList
        todos={state.todos}
        onClick={switchTodoHandler}
        deleteHandler={deleteHandler}
        />
    </div>
  );
}

export default App;
