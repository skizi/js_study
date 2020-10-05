import React from "react";
import {useState} from 'react';
import { connect } from 'react-redux';
import { showNotificationWithTimeout, setAddress, deleteAddress, switchAddress } from '../../store/hoge/actions';
import { RootState } from '../../store';




interface ButtonsProps {
  onShowNotification: () => void,
  onSetAddress: (address:string) => void,
  onDeleteAddress: (i:number) => void,
  onSwitchAddress: (a:number, b:number) => void
  addresses:string[]
}




const ArrayTest:React.FC<ButtonsProps> = (props:ButtonsProps) => {

	const [address, setAddress] = useState("");


  const [deleteItem, setDeleteItem] = useState("");
  const deleteItemHandler = () => {

    let i = parseInt( deleteItem );
    if( checkIndex( i ) ){
      props.onDeleteAddress(i);
    }else{
      alert("そのIndex番号は存在しません");
    }

  }


  const [switchItemA, setSwitchItemA] = useState("");
  const [switchItemB, setSwitchItemB] = useState("");
  const switchItemHandler = () =>{

    let a = parseInt( switchItemA );
    let b = parseInt( switchItemB );
    if( checkIndex( a ) && checkIndex( b ) ){
      props.onSwitchAddress( a, b );
    }

  }


  const checkIndex = ( i:number ):boolean => {

    var flag:boolean = false;
    if( -1 < i && i < props.addresses.length ) flag = true;

    return flag;

  }



	return (
		<>
      <style jsx>{`
        h3{
          padding-left:4px;
          border-left:2px solid #333;
        }
      `}</style>
      <h2>Reactでの配列操作 検証</h2>
			<input type="text" onChange={(e) => setAddress(e.target.value)} />
			<button onClick={()=>props.onSetAddress(address)}>追加</button>

      <h3>配列の最後の値（三項演算子でif文 & length使って最後の値取得）</h3>
      {
        props.addresses.length ? (<p>{props.addresses[props.addresses.length-1]}</p>) : null
      }

      <h3>配列の最後の値（即時関数内でif文 & sliceで最後の値取得）</h3>
      {(() => {
        if( props.addresses.length ){
          return (<p>{props.addresses.slice(-1)[0]}</p>);
        }
      })()}

      <h3>map関数で一覧表示</h3>
      <ul>
      {props.addresses.map(( _address, i ) => ( //mapは配列を返す
        <li key={i}>{i + ":" + _address}</li>
      ) )}
      </ul>

      <h3>filter関数でtを含む対象を表示</h3>
      <ul>
      {(() => {
        const _array = props.addresses.filter(( _address ) => {
          return _address.includes( "t" );
        });
        return _array.map(( _address, i ) => (
          <li key={i}>{i + ":" + _address}</li>
        ) );
      })()}
      </ul>

      <h3>forEarch関数で一覧表示</h3>
      <ul>
      {(() => {
        var _array:JSX.Element[] = [];
        props.addresses.forEach(( _address, i ) => { //forEachはループさせるだけ
          _array.push( <li key={i}>{i + ":" + _address}</li> );
        } );
        return (_array);
      })()}
      </ul>

      <h3>Index番号を指定して削除</h3>
      <input type="text" onChange={(e) => setDeleteItem(e.target.value)} />
      <button onClick={deleteItemHandler}>削除</button>

      <h3>Index番号を2つ指定して入れ替え</h3>
      <label htmlFor="switch-item-a">a</label><input type="text" onChange={(e) => setSwitchItemA(e.target.value)} id="switch-item-a" /><br />
      <label htmlFor="switch-item-b">b</label><input type="text" onChange={(e) => setSwitchItemB(e.target.value)} id="switch-item-b" />
      <button onClick={switchItemHandler}>入れ替え</button>

 		</>
	);

}


const mapStateToProps = (state:RootState) => {
  return { addresses:state.hoge.addresses }
};


type DispatchProps = {
    onShowNotification: () => void;
    onSetAddress: (address:string) => void;
    onDeleteAddress: (i:number) => void;
    onSwitchAddress:(a:number, b:number) => void;
};

const mapDispatchToProps = (dispatch:Function):DispatchProps => {
  return {
    onShowNotification: () => dispatch(showNotificationWithTimeout('foo')),
    onSetAddress : (address:string) => dispatch(setAddress(address)),
    onDeleteAddress : (i:number) => dispatch(deleteAddress(i)),
    onSwitchAddress : (a:number, b:number) => dispatch(switchAddress(a, b))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ArrayTest);