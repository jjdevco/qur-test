import Head from "next/head";
import ItemsList from "../components/ItemsList";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        sx={{ maxWidth: "100vw", minHeight: "100vh" }}
        backgroundColor="orange.100"
      >
        <h1>Welcome to Marketplace!</h1>
        <ItemsList />
      </Box>
    </>
  );
}
