import React, { useState } from "react";
import { useFetchApi } from "../customHook/useFetchApi";
import DataTable from "react-data-table-component";
import { useSearchParams } from "react-router-dom";

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

function Markets() {
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
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="coin-search">
        <h1 className="coin-text">Search a crypto Pair</h1>
        <form>
          {loading && <h3>Loading...</h3>}
          {error && <h3>An error has occurred</h3>}
          <input
            type="text"
            placeholder="search..."
            onChange={handleChange}
            className="coin-input"
          ></input>
        </form>
      </div>
      <DataTable
        columns={columns}
        data={data}
        className="table"
        pagination
        noDataComponent={<h3>Loading Data</h3>}
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
