import React from 'react'
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';


import Basic from './Basic'
import { ProfileContext } from "../../store/profile/contexts";

import { useBasic } from "../../store/profile/useBasic";
import { TextField } from '@material-ui/core'


/*
//このコード追記するとエラー出る
let realUseContext;
let useContextMock;
// Setup mock
beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
    React.useContext = realUseContext;
});
*/

//describe ブロックを使って複数のテストをグループ化することができます - https://jestjs.io/docs/ja/setup-teardown#%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%97
//it ブロックの中で実際にテストが行われます - https://tech.bitbank.cc/lets-test-by-jest/
//jest.fn()モック関数作成
//const mockCallback = jest.fn(x => 42 + x); //関数を引数に渡せる
//mockCallback( 0 ) //値を入れてモック関数を実行
//expect(mockCallback.mock.results[0].value).toBe(42); //最初に実行された際の戻り値は42かチェック - https://qiita.com/okumurakengo/items/9d2f8da82a85fddb41e5
//sinon.stub( HogeComponent, "propertyName" ) 処理を置き換える - https://www.wakuwakubank.com/posts/637-javascript-sinon/
//shallow 浅いレンダリング find('.hoge')でDOMの参照ができます
//shallow（浅い）はテスト内でコンポーネントをレンダリングする際に、紐づいた子コンポーネントを無視してくれます。 - https://qiita.com/sand/items/af2af0766ca00558457d
//mountは子コンポーネントも含めてフルレンダリングしてテストを行うときに使います。 - https://qiita.com/sand/items/af2af0766ca00558457d
//html()でレンダリングされたHTMLタグの文字列を返す - https://qiita.com/kotaonaga/items/d71c2912d6ddc60651db
//renderHook関数の中で、カスタムフックを発火させることにより、擬似的にカスタムフックをFunctional Componentの中で発火させている状態にします。 - https://qiita.com/bebetaro/items/4b4e2e8cdacddb5aa7bf
//renderHook関数の戻り値のresultオブジェクトのcurrentはカスタムフックの返り値と等しくなります。
//例として、result.current.counterをexpectで比較することで変数の値をテストすることが可能になります
//beforeEachは testとitの最初にbeforeEachの中身が実行される

//カスタムフックは個別にテスト
//コンポーネントも個別にテスト

//Enzym : React componentsは、通常は小さく、propsにのみ依存しているので、テストがしやすいという特徴があります。React componentsのテストにはEnzymeが推奨されています。



describe('<Basic>', () => {

	const handleBasicProfileChange = jest.fn();
	let validation = {
		message:{
			basic:{
				name:"",
				description:"",
				gender:"",
				birthday:""
			}
		}
	};
	const basic = {
		name:"",
		description:"",
		birthday:"",
		gender:""
	};

  	let theme = {
  		handleBasicProfileChange:handleBasicProfileChange,
  		validation:validation,
  		basic:basic
  	}

	// beforeEach(() => {
		// render(
		// 	<ProfileContext.Provider value={theme} >
		// 		<Basic />
		// 	</ProfileContext.Provider>
		// );
	// });

    it('イベントハンドラが4回呼ばれるか', () => {
		render(
			<ProfileContext.Provider value={theme} >
				<Basic />
			</ProfileContext.Provider>
		);
        fireEvent.change(screen.getByTestId('name'), { target: { value: 'よしお' } });
        fireEvent.change(screen.getByTestId('description'), { target: { value: 'こんにちわ！' } });
        fireEvent.click(screen.getByTestId('male'));
        fireEvent.change(screen.getByTestId('birthday'), { target: { value: '2020-11-12' } });
        expect(handleBasicProfileChange).toHaveBeenCalledTimes( 4 );

    });

    it('validationのアラート文が表示されるか', () => {
	  	theme.validation.message.basic.name = "名前を入力してください。";
	  	theme.validation.message.basic.gender = "性別を選択してください。";
	  	theme.validation.message.basic.birthday = "誕生日を選択してください。";
		render(
			<ProfileContext.Provider value={theme} >
				<Basic />
			</ProfileContext.Provider>
		);
        expect(screen.queryByText('名前を入力してください。')).not.toBeUndefined();
        expect(screen.queryByText('性別を選択してください。')).not.toBeUndefined();
        expect(screen.queryByText('誕生日を選択してください。')).not.toBeUndefined();
    });
	// it('onChange', () => {
	// 	const component = shallow(<Basic />);
	// 	component.find('input').simulate('change', {target: {value: 'input new value'}});

	// 	// expect(component.find('span').text()).toEqual('input new value');
	// });

});