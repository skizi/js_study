import Btn from '../atoms/btn';
import { toggleLoading } from '~/store/current-user'

import { useAppDispatch } from '~/store';
import { useSelector } from 'react-redux'
import { AppState } from '~/store'



const LoadingToggle: React.FC = (props) => {

  const dispatch:Function = useAppDispatch();

  const click:Function = ():void => {
  	dispatch(toggleLoading())
  }


  const isLoadingSelector:Function = (state: AppState): boolean => state.currentUser.isLoading;
  const isLoading:boolean = useSelector(isLoadingSelector)


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

          .loading-status{
            height:30px;
            line-height:30px;
            margin:0;
          }

          //:globalの左に必ずスペースがないと動作しない
          .loading-container :global(.toggle-btn){
            margin-right:20px;
          }
        `}
      </style>
  	  <h3>{props.title}</h3>
      <div className="loading-container">
    	  <Btn optionClassName="toggle-btn" btnClick={click}>ローディングをトグル</Btn>
    	  <p className="loading-status">{isLoading+""}</p>
      </div>
  	</>
  );

};


export default LoadingToggle;