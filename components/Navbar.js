import * as React from "react";
import SearchBox from "./SearchBox";
import { HStack } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <HStack
      sx={{ padding: "20px", justifyContent: "center" }}
      backgroundColor="orange.200"
    >
      <SearchBox />
    </HStack>
  );
}
