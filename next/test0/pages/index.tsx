import { useAppDispatch } from '~/store';
import { toggleLoading } from '~/store/current-user'

import { useSelector } from 'react-redux'
import { AppState } from '~/store'


const Index: React.FC = () => {

  const dispatch = useAppDispatch();

  const click = () => {
  	dispatch(toggleLoading())
  }


  const isLoadingSelector = (state: AppState): boolean => state.currentUser.isLoading;
  const isLoading = useSelector(isLoadingSelector)


  return (
  	<div>
	  <p>Hello Next.js2</p>
	  <button onClick={click}>btn</button>
	  <p>{isLoading+""}</p>
	</div>
  );

};

export default Index