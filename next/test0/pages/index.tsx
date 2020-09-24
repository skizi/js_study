import LoadingToggle from '~/components/organisms/loading-toggle';
import LoginContainer from '~/components/organisms/login-container';
import ZipContainer from '~/components/organisms/zip-container';

import RefTest from '~/components/organisms/ref-test'


const Index: React.FC = () => {

  return (
	<>
		<LoadingToggle title="ローディングをトグルする"></LoadingToggle>
		<LoginContainer title="ログイン"></LoginContainer>
		<ZipContainer></ZipContainer>
		<RefTest></RefTest>
	</>
  );

};

export default Index