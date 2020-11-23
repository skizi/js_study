import React from 'react'
import { render, fireEvent } from '@testing-library/react';

import Career from './Career'
import { ProfileContext } from "../../store/profile/contexts";



describe('<Career>', () => {

	let careers = [];

	let validation = {
		message:{
			careers:[{
			    company: "",
			    position: "",
			    startAt: "",
			    endAt: ""
			}]
		}
	};

	const handleAddCareer = jest.fn();
	const handleChangeCareer = jest.fn();
	const handleDeleteCareer = jest.fn();
  	let theme = {
        careers:careers,
        handleAddCareer:handleAddCareer,
        handleChangeCareer:handleChangeCareer,
        handleDeleteCareer:handleDeleteCareer,
  		validation:validation,
  	}


    it('イベントハンドラが指定通り回呼ばれるか', () => {
		const { getByTestId } = render(
			<ProfileContext.Provider value={theme} >
				<Career />
			</ProfileContext.Provider>
		);

		fireEvent.click(getByTestId('add'));
        expect(handleAddCareer).toHaveBeenCalledTimes( 1 );
    });
		

    it('イベントハンドラが指定回数通り呼ばれるか', () => {
    	theme.careers = [{
		    company: "",
		    position: "",
		    startAt: "",
		    endAt: ""
		}];
		const { getByTestId } = render(
			<ProfileContext.Provider value={theme} >
				<Career />
			</ProfileContext.Provider>
		);
		const companyInput = getByTestId('company');
		expect(companyInput).toBeTruthy();
        fireEvent.change(companyInput, { target: { value: '株式会社やまだ' } });
		const positionInput = getByTestId('position');
		expect(positionInput).toBeTruthy();
        fireEvent.change(positionInput, { target: { value: '部長' } });
		const startAtInput = getByTestId('startAt');
		expect(startAtInput).toBeTruthy();
        fireEvent.change(startAtInput, { target: { value: '2020-11' } });
		const endAtInput = getByTestId('endAt');
		expect(endAtInput).toBeTruthy();
        fireEvent.change(endAtInput, { target: { value: '2020-12' } });
        expect(handleChangeCareer).toHaveBeenCalledTimes( 4 );

    });

    it('validationのアラート文が表示されるか', () => {
	  	theme.validation.message.careers[0].company = "会社名を入力してください。";
	  	theme.validation.message.careers[0].position = "役職を入力してください。";
	  	theme.validation.message.careers[0].startAt = "開始月を入力してください。";
	  	theme.validation.message.careers[0].endAt = "終了月を入力してください。";
		const { queryByText } = render(
			<ProfileContext.Provider value={theme} >
				<Career />
			</ProfileContext.Provider>
		);
        expect(queryByText('会社名を入力してください。')).not.toBeUndefined();
        expect(queryByText('役職を入力してください。')).not.toBeUndefined();
        expect(queryByText('開始月を入力してください。')).not.toBeUndefined();
        expect(queryByText('終了月を入力してください。')).not.toBeUndefined();
    });

});