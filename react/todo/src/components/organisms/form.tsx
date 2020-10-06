import React, {useState} from 'react'


type Props = {
  addTodoHandler:( title:string, text:string ) => void
}

const Form:React.FC<Props> = ( props:Props ) => {

  const [ title, setTitle ] = useState("reactの勉強");
  const [ text, setText ] = useState("todoアプリを作っています！");


  const submitHandler = ( e:React.FormEvent<HTMLFormElement> ) => {

    props.addTodoHandler( title, text )
    e.preventDefault();

  }


  return (
    <div className="form">
      <form onSubmit={(e) => submitHandler(e) }>
        <input name="title" type="text" placeholder="タイトル ※必須" defaultValue="reactの勉強" onChange={(e)=>setTitle( e.target.value )} /><br/>
        <textarea name="desc" placeholder="説明を入力" defaultValue="todoアプリを作っています！" onChange={(e)=>setText( e.target.value )}></textarea><br/>
        <button type="submit">todoを作成</button>
      </form>
    </div>
  );
}

export default Form