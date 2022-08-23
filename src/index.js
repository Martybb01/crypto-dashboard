import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import App from "./App";
import "./index.css";
import { Root } from "./Root";
import Markets from "./pages/Markets";
import Assets from "./pages/Assets";

const fetcher = (url) => fetch(url).then((response) => response.json());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SWRConfig value={{ fetcher }}>
    <BrowserRouter>
      <React.StrictMode>
        {/* <App /> */}
        <div>
          <div className="link-style">
            <Link to="markets" className="link-style">
              Markets
            </Link>{" "}
            |{" "}
            <Link to="assets" className="link-style">
              Assets
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<Markets />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/assets" element={<Assets />} />
            <Route
              path="*"
              element={
                <div>
                  <p>Not found</p>
                  <Link to="/">Go Home</Link>
                </div>
              }
            />
          </Routes>
        </div>
      </React.StrictMode>
    </BrowserRouter>
  </SWRConfig>
);
