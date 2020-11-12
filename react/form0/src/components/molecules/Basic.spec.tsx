import React from 'react'
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';


import Basic from './Basic'
import { ProfileContext } from "../../store/profile/contexts";

import { useBasic } from "../../store/profile/useBasic";
import { TextField } from '@material-ui/core'



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


    it('イベントハンドラが4回呼ばれるか', () => {
		const { getByTestId } = render(
			<ProfileContext.Provider value={theme} >
				<Basic />
			</ProfileContext.Provider>
		);
        fireEvent.change(getByTestId('name'), { target: { value: 'よしお' } });
        fireEvent.change(getByTestId('description'), { target: { value: 'こんにちわ！' } });
        fireEvent.click(getByTestId('male'));
        fireEvent.change(getByTestId('birthday'), { target: { value: '2020-11-12' } });
        expect(handleBasicProfileChange).toHaveBeenCalledTimes( 4 );

    });

    it('validationのアラート文が表示されるか', () => {
	  	theme.validation.message.basic.name = "名前を入力してください。";
	  	theme.validation.message.basic.gender = "性別を選択してください。";
	  	theme.validation.message.basic.birthday = "誕生日を選択してください。";
		const { queryByText } = render(
			<ProfileContext.Provider value={theme} >
				<Basic />
			</ProfileContext.Provider>
		);
        expect(queryByText('名前を入力してください。')).not.toBeUndefined();
        expect(queryByText('性別を選択してください。')).not.toBeUndefined();
        expect(queryByText('誕生日を選択してください。')).not.toBeUndefined();
    });

});