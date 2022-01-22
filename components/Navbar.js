import * as React from "react";
import SearchBox from "./SearchBox";
import { Box, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../public/logo.png";

export default function Navbar() {
  const { push } = useRouter();
  return (
    <HStack
      sx={{ padding: "20px", justifyContent: "space-between" }}
      backgroundColor="orange.200"
    >
      <Box
        sx={{ cursor: "pointer", marginTop: "6px" }}
        onClick={() => push("/")}
      >
        <Image src={logo} alt="logo" width={70} height={32} />
      </Box>
      <SearchBox />
      <Box />
    </HStack>
  );
}
