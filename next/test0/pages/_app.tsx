import { Provider } from 'react-redux';
import store from '~/store/index';
import Head from 'next/head';
import Layout from '~/components/layout';
import { Auth0Provider as Auth0ProviderImpl } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

import { AppProps } from 'next/app';

type Props = {
  children?: React.Node;
};

const Auth0Provider: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  const onRedirectCallback: () => void = () => {
    router.replace('/');
  };

  return (
    <Auth0ProviderImpl
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={(typeof window !== 'undefined' && window.location.origin) || undefined}
      onRedirectCallback={onRedirectCallback}
    >
      {props.children}
    </Auth0ProviderImpl>
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>test0</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <style global jsx>{`
        html {
          height: 100%;
          width: 100%;
        }
        body {
          margin: 0;
          height: 100%;
          width: 100%;
        }
      `}</style>

      <Provider store={store}>
        <Auth0Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth0Provider>
      </Provider>
    </>
  );
};

export default MyApp;
