import Btn from '../atoms/btn';
import { toggleLoading } from '~/store/current-user'

import { useAppDispatch } from '~/store';
import { useSelector } from 'react-redux'
import { AppState } from '~/store'



const LoadingToggle: React.FC = (props) => {

  const dispatch = useAppDispatch();

  const click = () => {
  	dispatch(toggleLoading())
  }


  const isLoadingSelector = (state: AppState): boolean => state.currentUser.isLoading;
  const isLoading = useSelector(isLoadingSelector)


  return (
    <>
      <style jsx>
        {`
          h3{
            padding-left:4px;
            border-left:2px solid #333;
          }
          .loading-container{
            display:flex;
          }

          .btn{
            margin-right:20px;
          }

          .loading-status{
            height:30px;
            line-height:30px;
            margin:0 0 0 10px;
          }
        `}
      </style>
  	  <h3>{props.title}</h3>
      <div className="loading-container">
    	  <Btn btnClick={click}>ローディングをトグル</Btn>
    	  <p className="loading-status">{isLoading+""}</p>
      </div>
  	</>
  );

};


export default LoadingToggle;