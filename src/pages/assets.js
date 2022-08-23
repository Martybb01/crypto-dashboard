import React, { useEffect, useState } from "react";
import { useFetchApi } from "../components/useFetchApi";
import DataTable from "react-data-table-component";

const binancePublicEndpoint = "https://api.binance.com";
const exchangeInfoEndpoint = binancePublicEndpoint + "/api/v3/exchangeInfo";

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

function Assets() {
  const { symbol, loading, error } = useFetchApi();
  const { tickersPrice } = useFetchApi();
  const [search, setSearch] = useState("");
  // const crypto = symbol.concat(tickersPrice);
  // const [data, setData] = useState([...crypto]);

  let priceMap = tickersPrice.reduce((acc, curr) => {
    acc[curr.symbol] = curr;
    return acc;
  }, {});
  let combined = symbol.map((sign) =>
    Object.assign(sign, priceMap[sign.symbol])
  );

  const data = combined?.filter((coin) =>
    coin.symbol?.toLowerCase().includes(search.toLowerCase())
  );
  console.log(data);

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
      <DataTable columns={columns} data={data} className="table" pagination />
    </div>
  );
}
export default Assets;

// {
//   symbols.map((item) => {
//     const symbolTicker = price.find((ticker) => ticker.symbol === item.symbol);
//     return symbolTicker;
//   });
// }

// import React from "react";
// import Infotable from "../components/Infotable";
// import Table from "../components/Table";

// function Assets() {
//   return (
//     <div>
//       <Table />
//       {/* <Infotable /> */}
//     </div>
//   );
// }

// export default Assets;
