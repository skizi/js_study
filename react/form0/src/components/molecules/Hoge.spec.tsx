import React from 'react'
import { render, fireEvent, within, waitForElementToBeRemoved } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Hoge from './Hoge'
import { ProfileContext } from "../../store/profile/contexts";




describe('<Hoge>', () => {

	let college = {
	    name: "",
	    faculty: "",
	    department: "",
	    result: []
	};


	const handleChangeCollege = jest.fn();
	const handleSearchCollege = jest.fn();
	const handleResetCollege = jest.fn();
  	let theme = {
        handleChangeCollege:handleChangeCollege,
        handleSearchCollege:handleSearchCollege,
        handleResetCollege:handleResetCollege,
        college:college,
  	}


    it('イベントハンドラが指定通り回呼ばれるか', () => {
		const { getByTestId } = render(
			<ProfileContext.Provider value={theme} >
				<Hoge />
			</ProfileContext.Provider>
		);

        fireEvent.click(getByTestId('nameBtn'));
        expect(getByTestId('nameText')).toHaveTextContent('よしお');

        fireEvent.click(getByTestId('titleBtn'));
        expect(getByTestId('titleText')).toHaveTextContent('いい天気');

        fireEvent.change(getByTestId('titleInput'), { target: { value: '北海道' } });
        expect(getByTestId('titleText')).toHaveTextContent('北海道');
    });

		
});