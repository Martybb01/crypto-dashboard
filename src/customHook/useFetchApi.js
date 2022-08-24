import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

const binancePublicEndpoint = "https://api.binance.com";
const exchangeInfoEndpoint = binancePublicEndpoint + "/api/v3/exchangeInfo";
const tickersEndpoint = binancePublicEndpoint + "/api/v3/ticker/price";
const tickers24hchange = binancePublicEndpoint + "/api/v3/ticker/24hr";

export function useFetchApi() {
  const [symbol, setSymbol] = useState([]);
  const [tickersPrice, setTickersPrice] = useState([]);
  const [tickersChange, setTickersChange] = useState([]);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  async function fetchApi() {
    setLoading(true);
    setError(false);
    try {
      const exchangeInfo = await axios(exchangeInfoEndpoint, {
        method: "GET",
      });
      const exchangeInfoJson = await exchangeInfo.data;

      const tickersPrice = await axios(tickersEndpoint, { method: "GET" });
      const tickersPriceJson = await tickersPrice.data;

      const tickersChange = await axios(tickers24hchange, { method: "GET" });
      const tickersChangeJson = await tickersChange.data;

      setSymbol(exchangeInfoJson?.symbols);

      setTickersPrice(tickersPriceJson);

      setTickersChange(tickersChangeJson);
    } catch (error) {
      setError(error);
      console.log(error);
      setSymbol([]);
      setTickersChange([]);
      setTickersPrice([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return {
    symbol,
    tickersPrice,
    tickersChange,
    loading,
    error,
    onFetchApi: fetchApi,
  };
}

// export function useFetchApi() {
//   const { data: info, error: infoError, mutate } = useSWR(exchangeInfoEndpoint);
//   const { data: price, error: priceError } = useSWR(tickersEndpoint);
//   const { data: change24h, error: changeError } = useSWR(tickers24hchange);

//   function handleRefresh() {
//     mutate();
//   }

//   return {
//     info,
//     price,
//     change24h,
//     infoError,
//     priceError,
//     changeError,
//     loadingInfo: !info && !infoError,
//     loadingPrice: !price && !priceError,
//     loadingChange: !change24h && !changeError,
//     onRefresh: handleRefresh,
//   };
// }
