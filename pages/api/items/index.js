import axios from "axios";
import itemsMapper from "../../../utils/itemsMapper";

export default async function handler(req, res) {
  const { q: query, autocomplete, limit = 20, page = 1, type } = req.query;
  if (req.method === "GET") {
    try {
      if (autocomplete === "true" && query) {
        const { data: items } = await axios.get(
          `https://api.openbrewerydb.org/breweries/autocomplete?query=${query}`
        );

        // Return minimum data for autocomplete
        return res.status(200).json({ items: items.slice(0, 20) });
      } else {
        const { data } = await axios.get(
          `https://api.openbrewerydb.org/breweries/${
            query ? "search" : ""
          }?page=${page}&per_page=${limit}${query ? `&query=${query}` : ""}${
            type ? `&by_type=${type}` : ""
          }`
        );

        // Filter optional key properties and link a static random image for any item
        const items = data.map(itemsMapper);
        return res.status(200).json({ items });
      }
    } catch (error) {
      // TODO: handle error properly
      console.error(error, "something went wrong!");
      return res.status(500).send();
    }
  } else {
    console.log("call invalid method");
    return res.status(405).send();
  }
}
