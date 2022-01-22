import Head from "next/head";
import * as React from "react";
import axios from "axios";
import itemsMapper from "../../utils/itemsMapper";
import Navbar from "../../components/Navbar";
import ItemsList from "../../components/ItemsList";
import { Box, Text, HStack, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { toBase64, shimmer } from "../../utils/imageBlur";

export default function Item({ id, name, description, image, type }) {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        sx={{ maxWidth: "100vw", minHeight: "100vh" }}
        backgroundColor="orange.100"
      >
        <Navbar />
        <HStack sx={{ padding: "30px" }} alignItems="flex-start">
          <Image
            src={image}
            atl={name}
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(500, 500)
            )}`}
          />
          <Stack
            sx={{ padding: "0 20px", maxWidth: "350px" }}
            justify="space-evenly"
          >
            <Text
              as="h1"
              sx={{
                fontSize: "26px",
                fontWeight: "bold",
              }}
              isTruncated
            >
              {name}
            </Text>
            <Text>
              {description} - Lorem Ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book.
            </Text>
          </Stack>
        </HStack>
        <Text
          sx={{
            textAlign: "center",
            paddingTop: "30px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          color="purple"
        >
          Find other items about "{type}"
        </Text>
        <ItemsList type={type} />
      </Box>
    </>
  );
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  try {
    const { data } = await axios.get(
      `https://api.openbrewerydb.org/breweries/${id}`
    );

    const item = itemsMapper(data);
    return {
      props: {
        ...item,
      },
      revalidate: 20, // In seconds
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/404?item=${id}`,
        permanent: false,
      },
    };
  }
}

export async function getStaticPaths() {
  const { data } = await axios.get(
    `https://api.openbrewerydb.org/breweries?per_page=100`
  );

  const paths = data.map((item) => ({
    params: { id: item.id },
  }));

  return { paths, fallback: "blocking" };
}
