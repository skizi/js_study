import LoadingToggle from "~/components/organisms/loading-toggle";
import LoginContainer from "~/components/organisms/login-container";
import ZipContainer from "~/components/organisms/zip-container";

import RefTest from "~/components/organisms/ref-test";
import UseStateTest from "~/components/organisms/use-state-test";
import UseFormTest from "~/components/organisms/use-form-test";

// import ApiTest from '~/components/organisms/api-test';
import RestTest from "~/components/organisms/rest-test";

const Index: React.FC = () => {
  return (
    <>
      <LoadingToggle title="ローディングをトグルする" />
      <LoginContainer title="ログイン" />
      <ZipContainer />
      <RefTest />
      <UseStateTest />
      <UseFormTest />
      {/*<ApiTest />*/}
      <RestTest hoge0="hoge0" hoge1="hoge1" hoge2="hoge2" />
    </>
  );
};

export default Index;
