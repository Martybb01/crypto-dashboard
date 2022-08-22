import React, { useEffect, useState } from "react";
import { useFetchApi } from "../components/useFetchApi";
import DataTable from "react-data-table-component";

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
  },
];

function Assets() {
  const { info, infoError, loadingInfo, onRefresh } = useFetchApi();
  const { price, priceError, loadingPrice } = useFetchApi();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // console.log(info);
  // console.log(price);

  const symbols = info?.symbols;

  const coins = symbols?.filter((coin) =>
    coin.symbol?.toLowerCase().includes(search.toLowerCase())
  );

  const formatData = (symbols, prices) => {
    symbols.map((symbol, index) => {
      const price = prices.find((price) => price.symbol === symbol.symbol);
      return {
        ...symbol,
        id: index,
        symbolQuote: price.price,
      };
    });
  };

  useEffect(() => {
    if (info && price) {
      const _DATAS = formatData(info?.symbols, price);
      setData(_DATAS);
    }
  }, [info, price]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
