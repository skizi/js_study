import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState } from "../features/counter";


const Counter:React.FC = () => {

	const dispatch = useDispatch();
	const count = useSelector<CounterState, number>( state => state.count );
	const [ addCount, setAddCount ] = useState(0);

	const { add, decremented, incremented } = counterSlice.actions;

	return (
		<>	
			<h3>カウンター</h3>
			<p>{count}</p>
			<button onClick={()=>dispatch( incremented() )}>カウントアップ</button><br />
			<button onClick={()=>dispatch( decremented() )}>カウントダウン</button><br />
			<input type="text" onChange={e=>setAddCount( Number(e.target.value) )} />
			<button onClick={()=>dispatch( add(addCount) )}>入力値をカウント</button>
		</>
	);

}


export default Counter;