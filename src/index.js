import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./index.css";
import Markets from "./pages/Markets";
import Assets from "./pages/Assets";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <div>
        <div className="link-style">
          <Link to="/markets" className="link-style">
            Markets
          </Link>{" "}
          <Link to="/assets" className="link-style">
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
);
