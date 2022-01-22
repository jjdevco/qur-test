import Head from "next/head";
import ItemsList from "../components/ItemsList";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Marketplace!</h1>
        <ItemsList />
      </main>
    </div>
  );
}
