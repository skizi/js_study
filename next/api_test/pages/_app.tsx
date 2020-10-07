import { Provider } from 'react-redux';
import Head from 'next/head';
import Layout from '~/components/layout';

import { AppProps } from 'next/app';

import store from "~/store";


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

	return(
    <>
      <Head>
        <title>test0</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
	);

}


export default MyApp;