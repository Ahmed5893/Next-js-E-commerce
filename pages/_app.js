import Layout from "@/components/Layout";
import store from "@/store/store";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <Layout>
            <Head>
              <title>E-Commerce</title>
              <meta name="description" content="E-commerce shop" />
              <meta name="keywords" content="page, content, keywords" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            {Component.auth ? (
              <Auth adminOnly={Component.auth.adminOnly}>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </PayPalScriptProvider>
      </Provider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}
