import React, { useState } from "react";
import { useFetchApi } from "../customHook/useFetchApi";
import DataTable from "react-data-table-component";
import { Link, useSearchParams } from "react-router-dom";
import { createTheme } from "../styles/theme";

const columns = [
  {
    name: "Market",
    selector: (row) => row.symbol,
    sortable: true,
  },
  {
    name: "Base Asset",
    selector: (row) => row.baseAsset,
  },
  {
    name: "Quote Asset",
    selector: (row) => row.quoteAsset,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  // {
  //   name: "24h change",
  //   selector: (row) => row.priceChangePercent,
  //   sortable: true,
  // },
];

function Markets(createTheme) {
  const { symbol, loading, error } = useFetchApi();
  const { tickersPrice } = useFetchApi();
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const filterBaseAsset = searchParams.get("base_assets");

  let priceMap = tickersPrice.reduce((acc, curr) => {
    acc[curr.symbol] = curr;

    return acc;
  }, {});

  let combined = symbol.map((sign) =>
    Object.assign(sign, priceMap[sign.symbol])
  );

  let data = combined?.filter((coin) =>
    coin.symbol?.toLowerCase().includes(search.toLowerCase())
  );

  if (filterBaseAsset) {
    data = data.filter((data) => data.baseAsset === filterBaseAsset);
    return (
      <div>
        <div className="asset-container">
          Base Asset selected: {filterBaseAsset} ❊
          <Link to="/" className="back-market-link">
            Go to all markets
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={data}
          className="table"
          pagination
          noDataComponent={<h3>Loading Data</h3>}
          theme="violet"
        />
      </div>
    );
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="coin-search">
        <h1 className="coin-text">Search a Crypto Pair</h1>
        <form>
          {loading}
          {error && <h3>An error has occurred</h3>}
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            className="coin-input"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="search-icon"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
          </svg>
        </form>
      </div>
      <DataTable
        columns={columns}
        data={data}
        className="table"
        pagination
        noDataComponent={<h3>Loading Data</h3>}
        theme="violet"
      />
    </div>
  );
}
export default Markets;

//! implementazione 24hChange (da vedere perchè non viene)
// const { tickersChange } = useFetchApi();
// const [cripto, setCripto] = useState([]);

// let changeMap = tickersChange.reduce((acc, curr) => {
//   acc[curr.symbol] = curr;

//   return acc;
// }, {});

// const bothObj = Object.assign(priceMap, changeMap);
// console.log(bothObj);

// const both = Object.keys(bothObj).map((key) => [Number(key), bothObj[key]]);
// console.log(both);

// useEffect(() => {
//   setCripto((changeMap) => {
//     return { ...changeMap, ...priceMap };
//   });
// }, []);
// console.log(cripto);
