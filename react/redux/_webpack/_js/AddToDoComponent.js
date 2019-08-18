import React from 'react';
import { Provider,connect } from 'react-redux'; // 追加

// 追加
let AddToDoComponent = ({dispatch}) => {
    let input;

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addToDo(input.value));
        input.value = "";
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input ref={ node => {input = node} }/>
                <button>Todo に追加する</button>
            </form>
        </div>
    );
};

AddToDoComponent = connect()(AddToDoComponent);
