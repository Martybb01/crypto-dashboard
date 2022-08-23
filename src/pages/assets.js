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
    name: "BaseAsset",
    selector: (row) => row.baseAsset,
  },
  {
    name: "QuoteAsset",
    selector: (row) => row.quoteAsset,
  },
  {
    name: "Prezzo",
    selector: (row) => row.price,
    sortable: true,
  },
];

function Assets() {
  const { symbol } = useFetchApi();
  const { tickersPrice } = useFetchApi();
  // const { info, infoError, loadingInfo, onRefresh } = useFetchApi();
  // const { price, priceError, loadingPrice } = useFetchApi();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  // console.log(symbol);
  let crypto = symbol.concat(tickersPrice);
  console.log(crypto);
  console.log(tickersPrice);

  // const symbols = info?.symbols;

  const coins = symbol?.filter((coin) =>
    coin.symbol?.toLowerCase().includes(search.toLowerCase())
  );

  // useEffect(() => {
  //   const priceMerger = (s) => {
  //     const priceFound = tickersPrice.find((p) => s === p.symbol);
  //     return (
  //       priceFound && {
  //         price: priceFound.price,
  //       }
  //     );
  //   };
  //   if (symbol && tickersPrice) {
  //     const marketMap = symbol.map(
  //       (symbol) => (symbol = { ...symbol, ...priceMerger(symbol.symbol) })
  //     );
  //     setData(marketMap);
  //   }
  // }, [symbol, tickersPrice]);

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

  // const data = symbols.map((item) => {
  //   const symbolTicker = price.find((ticker) => ticker.symbol == item.symbol )
  //   return symbolTicker
  // })

  return (
    <div className="App">
      <form>
        <input
          type="text"
          placeholder="search a crypto"
          onChange={handleChange}
        ></input>
      </form>
      <DataTable
        columns={columns}
        // data={symbols.map((item) => {
        //   const symbolTicker = price.find(
        //     (ticker) => ticker.symbol === item.symbol
        //   );

        //   return symbolTicker;
        // })}
        data={coins}
        pagination
      />
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
