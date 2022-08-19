import { SWRConfig } from "swr";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const fetcher = (url) => axios(url).then((response) => response.json);
console.log(fetcher);

export function Root() {
  return (
    // <SWRConfig value={{ fetcher }}>
    <BrowserRouter>
      <h1>{console.log(fetcher)}</h1>
      <App />
    </BrowserRouter>
    /* </SWRConfig> */
  );
}
