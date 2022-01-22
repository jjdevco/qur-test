import * as React from "react";
import fetcher from "../utils/fetcher";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import ItemsListItem from "./ItemsListItem";
import ItemsListSkeleton from "./ItemsListSkeleton";
import { Stack, Text } from "@chakra-ui/react";

export default function ItemsList({ query, type }) {
  const [hasMore, setHasMore] = React.useState(true);

  // Part of this snippet of code was extracted from the official documentation of "SWR"
  // A function to get the SWR key of each page,
  // its return value will be accepted by `fetcher`.
  // If `null` is returned, the request of that page won't start.
  const getKey = React.useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) {
        setHasMore(false);
        return null;
      } // reached the end
      // the page count start in 0, so 1 is added to every request
      return `/api/items?page=${pageIndex + 1}&limit=20${
        query ? `&q=${query}` : ""
      }${type ? `&type=${type}` : ""}`; // SWR key
    },
    [query]
  );

  const { data, size, setSize, error, isValidating } = useSWRInfinite(
    getKey,
    (url) => fetcher(url, (data) => data.items),
    { revalidateOnFocus: false }
  );

  const { ref: loadMoreRef, inView: fetchMore } = useInView();

  const isLoadingInitialData = !data && !error;

  React.useEffect(() => {
    if (fetchMore && !isLoadingInitialData && !isValidating && hasMore) {
      setSize(size + 1);
    }
  }, [fetchMore, isLoadingInitialData, isValidating, hasMore]);

  if (error) return <div>failed to load</div>;

  return (
    <div>
      {data && (
        <Stack
          sx={{
            maxWidth: "100vw",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "30px 0",
          }}
          spacing={0}
          isInline
        >
          {data.map((items, index) => {
            // `data` is an array of each page's API response.
            return items.map((item) => (
              <ItemsListItem key={item.id} {...item} />
            ));
          })}
        </Stack>
      )}
      {!hasMore && (
        <Text
          sx={{
            padding: "0 20px 30px 20px",
            textAlign: "center",
            fontSize: "22px",
          }}
          color="red"
        >
          No more results
        </Text>
      )}
      {(isLoadingInitialData || isValidating) && <ItemsListSkeleton />}
      <div
        style={{
          height: "5px",
          width: "100%",
        }}
        ref={loadMoreRef}
      />
    </div>
  );
}
