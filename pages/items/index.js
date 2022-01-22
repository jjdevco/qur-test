import Head from "next/head";
import Navbar from "../../components/Navbar";
import ItemsList from "../../components/ItemsList";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Items() {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Search - {query?.search}</title>
      </Head>

      <Box
        as="main"
        sx={{ maxWidth: "100vw", minHeight: "100vh" }}
        backgroundColor="orange.100"
      >
        <Navbar />
        <ItemsList query={query?.search} />
      </Box>
    </>
  );
}
