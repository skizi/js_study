import Link from 'next/link'
import TestBtn from "../components/molecules/TestBtn";
import { useApiTest } from "../hooks/useApiTest";
import styled, { css } from 'styled-components';



const StyledPanel = styled(
  ({
    redFlag: _redFlag,
    ...props
  }) => <TestBtn {...props} />
)`
  ${({ theme, redFlag }) => css`
    background-color:#00f;
    ${redFlag &&
    css`
      border: solid 4px #f00;
      font-size:30px;
    `}
    ${!redFlag &&
    css`
      border: solid 4px #0f0;
    `}
  `}
`;


const Index = ():JSX.Element => {

	const { loadingFlag, getCurrentUser } = useApiTest();

	const clickHandler = ():void => {
		getCurrentUser();
	};


	return (
		<div>
			<TestBtn clickHandler={clickHandler} />
			<StyledPanel clickHandler={clickHandler} redFlag={true} />
		</div>
	);
};

export default Index