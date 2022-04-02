import * as React from "react";
import { HStack, Stack, Box, Skeleton } from "@chakra-ui/react";

export default function ItemsListSkeleton() {
  return [...Array(20).keys()].map((el) => (
    <Box
      key={el}
      sx={{
        margin: "20px !important",
        padding: "10px",
        width: "160px",
      }}
      bg="gray.100"
      rounded="lg"
      boxShadow="2xl"
    >
      <Skeleton sx={{ height: "120px" }} endColor="blue.100" />
      <Skeleton sx={{ height: "16px" }} mt="4" />
      <Skeleton sx={{ height: "12px", width: "100px" }} mt="4" />
      <Skeleton
        sx={{
          height: "24px",
          width: "70px",
          float: "right",
        }}
        mt="6"
        endColor="red.100"
      />
    </Box>
  ));
}
