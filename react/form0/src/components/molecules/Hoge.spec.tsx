import React from 'react'
import { render, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

import Hoge from './Hoge'




describe('<Hoge>', () => {

    it('イベントハンドラが指定回数通り呼ばれるか', () => {
		const { getByTestId } = render(
			<Hoge />
		);

        fireEvent.click(getByTestId('nameBtn'));
        expect(getByTestId('nameText')).toHaveTextContent('よしお');

        fireEvent.click(getByTestId('titleBtn'));
        expect(getByTestId('titleText')).toHaveTextContent('いい天気');

        fireEvent.change(getByTestId('titleInput'), { target: { value: '北海道' } });
        expect(getByTestId('titleText')).toHaveTextContent('北海道');
    });

		
});