import React, { useEffect, useState } from "react";
import { useFetchApi } from "../customHook/useFetchApi";
import DataTable from "react-data-table-component";
import { useSearchParams } from "react-router-dom";

const columns = [
  {
    name: "Nome Mercato",
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
    name: "Prezzo",
    selector: (row) => row.price,
    sortable: true,
  },
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

  // const formatData = (symbols, prices) => {
  //   symbols.map((symbol, index) => {
  //     const symbolTicker = prices.find(
  //       (price) => price.symbol === symbol.symbol
  //     );
  //     return {
  //       ...symbols,
  //       id: index,
  //       symbolQuote: symbolTicker?.price,
  //     };
  //   });
  // };

  // useEffect(() => {
  //   if (symbol && tickersPrice) {
  //     const _DATAS = formatData(coins, tickersPrice);
  //     setData(_DATAS);
  //   }
  // }, [coins, symbol, tickersPrice]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

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
