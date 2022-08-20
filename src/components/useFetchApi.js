import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

const binancePublicEndpoint = "https://api.binance.com";
const exchangeInfoEndpoint = binancePublicEndpoint + "/api/v3/exchangeInfo";
const tickersEndpoint = binancePublicEndpoint + "/api/v3/ticker/price";
const tickers24hchange = binancePublicEndpoint + "/api/v3/ticker/24hr";

// export function useFetchApi() {
//   // const [symbol, setSymbol] = useState([]);
//   // const [tickersPrice, setTickersPrice] = useState([]);
//   // const [tickersChange, setTickersChange] = useState([]);
//   const [data, setData] = useState({
//     info: [],
//     price: [],
//     change: [],
//   });
//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);

//   async function fetchApi() {
//     setLoading(true);
//     setError(false);
//     try {
//       const exchangeInfo = await axios(exchangeInfoEndpoint, {
//         method: "GET",
//       });
//       // const exchangeInfoJson = await exchangeInfo.json();
//       // console.log(exchangeInfoJson);

//       const tickersPrice = await axios(tickersEndpoint, { method: "GET" });
//       // const tickersPriceJson = await tickersPrice.json();
//       // console.log(tickersPriceJson);

//       const tickersChange = await axios(tickers24hchange, { method: "GET" });
//       // const tickersChangeJson = await tickersChange.json();
//       // console.log(tickersChangeJson);
//       setData({
//         info: exchangeInfo,
//         price: tickersPrice,
//         change: tickersChange,
//       });
//       // setSymbol(exchangeInfoJson.symbols);
//       // setTickersPrice(tickersPriceJson);
//       // setTickersChange(tickersChangeJson);
//       // setData({ exchangeInfoJson, tickersChangeJson, tickersPriceJson });
//     } catch (error) {
//       setError(error);
//       console.log(error);
//       // setSymbol([]);
//       // setTickersChange([]);
//       // setTickersPrice([]);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchApi();
//   }, []);

//   return {
//     data,
//     loading,
//     error,
//     onFetchApi: fetchApi,
//   };
// }

export function useFetchApi() {
  const { data: info, error: infoError, mutate } = useSWR(exchangeInfoEndpoint);
  const { data: price, error: priceError } = useSWR(tickersEndpoint);
  const { data: change24h, error: changeError } = useSWR(tickers24hchange);

  function handleRefresh() {
    mutate();
  }

  return {
    info,
    price,
    change24h,
    infoError,
    priceError,
    changeError,
    loadingInfo: !info && !infoError,
    loadingPrice: !price && !priceError,
    loadingChange: !change24h && !changeError,
    onRefresh: handleRefresh,
  };
}

// export function useFetchApi(binancePublicEndpoint) {
//   const { data: info, error } = useSWR(exchangeInfoEndpoint);

//   return {
//     info,
//     error,
//     isLoading: !info && !error,
//   };
// }

// export function useFetchApi2(binancePublicEndpoint) {
//   const { data: price, error } = useSWR(tickersEndpoint);

//   return {
//     price,
//     error,
//     isLoading: !price && !error,
//   };
// }

// export function useFetchApi3(binancePublicEndpoint) {
//   const { data: change, error } = useSWR(tickers24hchange);
//   return {
//     change,
//     error,
//     isLoading: !change && !error,
//   };
// }
