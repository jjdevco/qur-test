import axios from "axios";

const fetcher = (url, cb) =>
  axios.get(url).then((res) => (!!cb ? cb(res.data) : res.data));

export default fetcher;
