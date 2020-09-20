
import LoginButton from '../atoms/login-button';

type Props = {
  title : string
}



const LoginContainer: React.FC<Props> = (props) => {

  return (
    <>
      <style jsx>
        {`
          h3{
            padding-left:4px;
            border-left:2px solid #333;
          }

        `}
      </style>
  	  <h3>{props.title}</h3>
      <div className="login-container">
        <LoginButton></LoginButton>
      </div>
  	</>
  );

};


export default LoginContainer;