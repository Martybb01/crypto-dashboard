import React from "react";
import DataTable from "react-data-table-component";
import { useFetchApi } from "./useFetchApi";

function Table() {
  // const { symbol, tickersChange, tickersPrice, loading, error, onFetchApi } =
  //   useFetchApi();
  const { data, loading, error, onFetchApi } = useFetchApi();

  const columns = [
    {
      name: "Nome mercato",
      selector: (row) => row.symbols.symbol,
      sortable: true,
    },
    {
      name: "Base Asset",
      selector: (row) => row.symbols.baseAsset,
    },
    {
      name: "Quote Asset",
      selector: (row) => row.symbols.quoteAsset,
    },
    {
      name: "Prezzo",
      selector: (row) => row.price,
    },
    {
      name: "Variazione 24h",
      selector: (row) => row.priceChangePercent,
      sortable: true,
    },
  ];

  const data2 = [
    {
      symbol: 1,
      baseAsset: "ciao",
      quoteAsset: "1988",
      price: 1000,
      priceChangePercent: "10%",
    },
    {
      symbol: 2,
      baseAsset: "ciao",
      quoteAsset: "1988",
      price: 1000,
      priceChangePercent: "30%",
    },
    {
      symbol: 3,
      baseAsset: "ciao",
      quoteAsset: "1988",
      price: 1000,
      priceChangePercent: "45%",
    },
  ];

  return (
    <div className="table-container" onChange={onFetchApi}>
      <h3>Material table</h3>
      {loading && <h1>Loading...</h1>}
      {error && <h1>An error has occured</h1>}
      {data && <h1>{data}</h1>}
      <DataTable title="Crypto data" data={data} columns={columns} />
    </div>
  );
}

export default Table;
