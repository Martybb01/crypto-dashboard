import "./App.css";
import { Datatable } from "./components/Datatable";
import { Link, Route, Routes } from "react-router-dom";
import Assets from "./pages/Assets";
import Markets from "./pages/Markets";

export function App() {
  return (
    <div>
      <div>
        <Link to="markets">Markets</Link> | <Link to="assets">Assets</Link>
      </div>
      <Routes>
        <Route path="/" element={<Assets />} />
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
  );
}

export default App;
