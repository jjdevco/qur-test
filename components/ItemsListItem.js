import * as React from "react";
import { Flex, VStack, Text, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { toBase64, shimmer } from "../utils/imageBlur";
import { useRouter } from "next/router";

export default function ItemsListItem({ id, name, description, price, image }) {
  const { push } = useRouter();
  return (
    <VStack
      sx={{
        minHeight: "160px",
        maxWidth: "160px",
        maxHeight: "320px",
        margin: "20px !important",
        flex: "0 0 100%",
        padding: "10px",
        border: "2px solid transparent",
        cursor: "pointer",
        transition: "all 200ms ease-in-out",
      }}
      backgroundColor="gray.50"
      align="left"
      rounded="lg"
      boxShadow="2xl"
      _hover={{ borderColor: "purple.600", backgroundColor: "gray.100" }}
      onClick={() => push(`/items/${id}`)}
    >
      <Flex>
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
      </Flex>
      <Text sx={{ fontWeight: "bold" }} fontSize="sm">
        {name}
      </Text>
      <Text sx={{ maxWidth: "140px" }} fontSize="xs" align="left" isTruncated>
        {description}
      </Text>
      <Spacer />
      <Text
        sx={{ fontWeight: "bold" }}
        align="right"
        justifySelf="flex-end"
        color="red"
      >
        ${price}
      </Text>
    </VStack>
  );
}
