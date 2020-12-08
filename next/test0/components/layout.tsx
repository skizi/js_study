import GlobalHeader from '~/components/organisms/global-header';
import GlobalFooter from '~/components/organisms/global-footer';

type Props = {
  children?: React.Node;
};

const Layout: React.FC<Props> = (props: Props) => {
  return (
    <>
      <style jsx>{`
        .main-container {
          width: 500px;
          margin: 30px auto 30px;
        }
      `}</style>
      <GlobalHeader />
      <div className="main-container">{props.children}</div>
      <GlobalFooter />
    </>
  );
};

export default Layout;
