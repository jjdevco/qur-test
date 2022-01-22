import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} resetCSS />
    </ChakraProvider>
  );
}

export default MyApp;
