import "../styles/globals.scss";
import type { AppProps } from "next/app";

function UserCrud({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default UserCrud;
