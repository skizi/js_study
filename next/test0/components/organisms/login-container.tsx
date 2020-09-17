
import LoginButton from '../atoms/login-button';
import { useAuth0 } from "@auth0/auth0-react";


const LoginContainer: React.FC = (props) => {

  const { user } = useAuth0();

  console.log(user);

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