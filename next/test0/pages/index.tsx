import LoadingToggle from '~/components/organisms/loading-toggle';
import LoginContainer from '~/components/organisms/login-container';


const Index: React.FC = () => {

  return (
	<>
		<LoadingToggle title="ローディングをトグルする"></LoadingToggle>
		<LoginContainer title="ログイン"></LoginContainer>
	</>
  );

};

export default Index