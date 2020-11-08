import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'


import Basic from './Basic'
import { ProfileContext } from "../../store/profile/contexts";

import { useBasic } from "../../store/profile/useBasic";



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



describe('<Basic>', () => {
	
	const [ validation, setValidation ] = useState<ValidationType>({
	isStartValidation: false,
	message: {
	  basic:{
	    name: "",
	    description: "",
	    birthday: "",
	    gender: "",
	  },
	  address: {
	    postalcode: "",
	    prefecture: "",
	    city: "",
	    restAddress: ""
	  },
	  college: {
	    faculty: ""
	  },
	  careers: []
	}
	});
	const { basic, handleBasicProfileChange } = useBasic( profile, recalculateValidation );

	const wrapper = ({ children }) => (
		<ProfileContext handleBasicProfileChange={handleBasicProfileChange}
		validation={validation}
		basic={basic}
		>{children}</ProfileContext>
	)
	// const { result } = renderHook(() => useBasic(), { wrapper });

	it('onChange', () => {
		const component = shallow(<Basic />);
		component.find('input').simulate('change', {target: {value: 'input new value'}});

		// expect(component.find('span').text()).toEqual('input new value');
	});

});