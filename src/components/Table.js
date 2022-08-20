import React from "react";
import DataTable from "react-data-table-component";
import { useFetchApi } from "./useFetchApi";

function Table() {
  // const { symbol, tickersChange, tickersPrice, loading, error, onFetchApi } =
  //   useFetchApi();
  // const { data, loading, error, onFetchApi } = useFetchApi();
  const { info, infoError, loadingInfo, onRefresh } = useFetchApi();
  const { price, priceError, loadingPrice } = useFetchApi();
  const { change, changeError, loadingChange } = useFetchApi();

  // const cloneInfo = Object.assign([], info.symbols);
  // console.log(cloneInfo);

  const columns = [
    {
      name: "Nome mercato",
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
    },
    {
      name: "Variazione 24h",
      selector: (row) => row.priceChangePercent,
      sortable: true,
    },
  ];

  const data = [
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
      priceChangePercent: "20%",
    },
  ];

  return (
    <div className="table-container">
      <h3>Material table</h3>
      <button onClick={onRefresh}>Refresh</button>
      {loadingInfo && <h1>Loading...</h1>}
      {infoError && <h1>An error has occured</h1>}
      {info && <h1>{info}</h1>}
      <DataTable title="Crypto data" data={data} columns={columns} />
    </div>
  );
}

export default Table;
