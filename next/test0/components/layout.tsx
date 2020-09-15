import GlobalHeader from '~/components/organisms/global-header';
import GlobalFooter from '~/components/organisms/global-footer';
import { Box } from '@material-ui/core';

const Layout: React.FC = (props) => {
  return (
    <>
      <GlobalHeader />
      <div>{props.children}</div>
      <GlobalFooter />
    </>
  );
};

export default Layout;
