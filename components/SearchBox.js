import * as React from "react";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Button,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  List,
  ListItem,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  HStack,
  PopoverBody,
  Divider,
  background,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useRouter } from "next/router";

export default function SearchBox() {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [results, setResults] = React.useState(undefined);
  const [isFetching, setIsFetching] = React.useState(false);

  const { push } = useRouter();

  const handleFetch = React.useCallback(
    debounce(async (query) => {
      try {
        const { data } = await axios.get(
          `/api/items/?autocomplete=true&q=${query}`
        );

        setResults(data.items);
      } catch (error) {
        if (error.response?.status === 404) {
          setResults([]);
        } else {
          setResults(undefined);
          setError(error);
        }
      } finally {
        setIsFetching(false);
      }
    }, 500),
    []
  );

  return (
    <Flex sx={{ width: "100%", maxWidth: "400px" }} align="center">
      <Popover isOpen={isOpen && !!query} closeOnBlur={true} autoFocus={false}>
        <PopoverAnchor>
          <InputGroup size="sm">
            <Input
              sx={{ borderColor: "blue.400", color: "black" }}
              placeholder="Search item"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsFetching(true);
                !isFetching && handleFetch(event.target.value);
              }}
              onFocus={() => setIsOpen(true)}
            />
            {!!query && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear"
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  icon={<div>X</div>}
                  onClick={() => setQuery("")}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </PopoverAnchor>

        <PopoverContent>
          <PopoverBody sx={{ padding: 0 }}>
            {isFetching && <div>loading...</div>}
            {!isFetching && (
              <List>
                {results?.map((item, idx) => {
                  return (
                    <>
                      <ListItem
                        key={item.id}
                        sx={{
                          padding: "5px",
                          textAlign: "center",
                          cursor: "pointer",
                          _hover: {
                            background: "gray.100",
                          },
                        }}
                        onClick={() => {
                          setIsOpen(false);
                          push(`/items/${item.id}`);
                        }}
                      >
                        {item.name}
                      </ListItem>
                      {idx + 1 < results?.length && <Divider />}
                    </>
                  );
                })}
              </List>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Button
        rounded="sm"
        size="sm"
        colorScheme="blue"
        isDisabled={!query}
        onClick={() => {
          setIsOpen(false);
          push(`/items/?search=${query}`);
        }}
      >
        Search
      </Button>
    </Flex>
  );
}
