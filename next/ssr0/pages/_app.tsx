import { Provider } from 'react-redux';
import Head from 'next/head';
import Layout from '~/components/layout';

import { AppProps } from 'next/app';

import { useStore } from "~/store";



//pagePropsにはgetServerSidePropsなどで取得した値が自動で入る
const MyApp: React.FC<AppProps> = ({ Component, pageProps }:AppProps) => {

  const store = useStore(pageProps.initialReduxState)

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