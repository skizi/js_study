import LoadingToggle from '~/components/organisms/loading-toggle';
import LoginContainer from '~/components/organisms/login-container';
import ZipContainer from '~/components/organisms/zip-container';

import RefTest from '~/components/organisms/ref-test'
import UseStateTest from '~/components/organisms/use-state-test'
import UseFormTest from '~/components/organisms/use-form-test'

import ApiTest from '~/components/organisms/api-test'


const Index: React.FC = () => {

  return (
	<>
		<LoadingToggle title="ローディングをトグルする" />
		<LoginContainer title="ログイン" />
		<ZipContainer />
		<RefTest />
		<UseStateTest />
		<UseFormTest />
		<ApiTest />
	</>
  );

};

export default Index