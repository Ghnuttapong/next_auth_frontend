import Head from "next/head";
import Sidebar from "../../components/sidebar";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { asPath } = useRouter();

  return (
    <div>
      <Head>
        <title>Dashboard {asPath === '/'? '' : '| ' + asPath.replace("/", "").toLocaleUpperCase()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
        <div className="lg:ml-60 px-10 mt-20">{children}</div>
      </main>
    </div>
  );
}
