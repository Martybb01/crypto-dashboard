import { SWRConfig } from "swr";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const fetcher = (url) => axios(url).then((response) => response.json);

export function Root() {
  return (
    <SWRConfig value={{ fetcher }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  );
}
