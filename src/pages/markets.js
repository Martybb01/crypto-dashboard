// import React from "react";
// import Table from "../components/Table";

import React from "react";

// function Markets() {
//   return (
//     <div>
//       <Table />
//     </div>
//   );
// }

// export default Markets;

const binancePublicEndpoint = "https://api.binance.com";
const exchangeInfoEndpoint = binancePublicEndpoint + "/api/v3/exchangeInfo";
const tickersEndpoint = binancePublicEndpoint + "/api/v3/ticker/price";

export default class App extends React.Component {
  state = {
    symbols: [],
    tickers: [],
  };

  componentDidMount = async () => {
    const exchangeInfo = await fetch(exchangeInfoEndpoint, {
      method: "GET",
    });
    const exchangeInfoJson = await exchangeInfo.json();
    console.log(exchangeInfoJson);

    const tickers = await fetch(tickersEndpoint, { method: "GET" });
    const tickersJson = await tickers.json();

    this.setState({
      ...this.state,
      tickers: tickersJson,
      symbols: exchangeInfoJson.symbols,
    });
  };

  render() {
    return (
      <div class="card-container">
        {this.state.symbols.slice(0, 20).map((item, key) => {
          const symbolTicker = this.state.tickers.find(
            (ticker) => ticker.symbol === item.symbol
          );
          return (
            <Card
              symbol={item.symbol}
              baseAsset={item.baseAsset}
              quoteAsset={item.quoteAsset}
              price={symbolTicker?.price}
            />
          );
        })}
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    return (
      <div className="exchangeinfo__card">
        <div className="card-footer">
          <p>SYMBOL: {this.props.symbol}</p>
          <p>PRICE: {this.props.price}</p>
        </div>
        <div className="card-footer">
          <p>baseAsset: {this.props.baseAsset}</p>
          <p>quoteAsset: {this.props.quoteAsset}</p>
        </div>
      </div>
    );
  }
}
