import axios from "axios";
import itemsMapper from "../../../utils/itemsMapper";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(
        `https://api.openbrewerydb.org/breweries/${id}`
      );
      const item = itemsMapper(data);
      return res.status(200).json(item);
    } catch (error) {
      if (error.response?.status === 404) {
        return res.status(404).send();
      }
      // TODO: handle error properly
      console.error(error, "something went wrong!");
      return res.status(500).send();
    }
  } else {
    console.log("call invalid method");
    return res.status(405).send();
  }
}
