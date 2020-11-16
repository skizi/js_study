import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import College from './College'
import { ProfileContext } from "../../store/profile/contexts";



describe('<College>', () => {

	let college = {
	    name: "",
	    faculty: "",
	    department: "",
	    result: []
	};

	let validation = {
		message:{
			college:{
			    faculty: ""
			}
		}
	};

	const handleChangeCollege = jest.fn();
	const handleSearchCollege = jest.fn();
	const handleResetCollege = jest.fn();
  	let theme = {
        handleChangeCollege:handleChangeCollege,
        handleSearchCollege:handleSearchCollege,
        handleResetCollege:handleResetCollege,
        college:college,
        validation:validation
  	}


    it('イベントハンドラが指定通り回呼ばれるか', () => {
		const { getByTestId } = render(
			<ProfileContext.Provider value={theme} >
				<College />
			</ProfileContext.Provider>
		);

        fireEvent.change(getByTestId('search'), { target: { value: '北海道' } });
        fireEvent.click(getByTestId('searchBtn'));
        expect(handleSearchCollege).toHaveBeenCalledTimes( 1 );
    });


    it('イベントハンドラが指定通り回呼ばれるか', async () => {
    	theme.college.name = "北海道大学";
    	theme.college.result = [{
    		name:"北海道大学",
    		faculty:["普通学部"],
    		department:["普通学科"]
    	}];
		const { getByTestId } = render(
			<ProfileContext.Provider value={theme} >
				<College />
			</ProfileContext.Provider>
		);
		// const select = await waitForElement(() =>
		//   getByTestId("faculty")
		// );
		const select = getByTestId("faculty");
		select.value = "普通学部";
		fireEvent.change(select);
        expect(handleChangeCollege).toHaveBeenCalledTimes( 1 );
    });
		
    /*

    it('validationのアラート文が表示されるか', () => {
	  	theme.validation.message.careers[0].company = "会社名を入力してください。";
	  	theme.validation.message.careers[0].position = "役職を入力してください。";
	  	theme.validation.message.careers[0].startAt = "開始月を入力してください。";
	  	theme.validation.message.careers[0].endAt = "終了月を入力してください。";
		const { queryByText } = render(
			<ProfileContext.Provider value={theme} >
				<College />
			</ProfileContext.Provider>
		);
        expect(queryByText('会社名を入力してください。')).not.toBeUndefined();
        expect(queryByText('役職を入力してください。')).not.toBeUndefined();
        expect(queryByText('開始月を入力してください。')).not.toBeUndefined();
        expect(queryByText('終了月を入力してください。')).not.toBeUndefined();
    });
    */

});