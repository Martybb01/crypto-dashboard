import useSWR from "swr";

const binancePublicEndpoint = "https://api.binance.com";
const exchangeInfoEndpoint = binancePublicEndpoint + "/api/v3/exchangeInfo";
const tickersEndpoint = binancePublicEndpoint + "/api/v3/ticker/price";

export function useFetchApi() {
  const { data: info, error: infoError } = useSWR(exchangeInfoEndpoint);
  const { data: price, error: priceError } = useSWR(tickersEndpoint);
  return {
    info,
    price,
    infoError,
    priceError,
    loading: !info && !infoError,
    loading2: !price && !priceError,
  };
}
