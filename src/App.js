import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const [value, setValue] = useState(0);
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleReset() {
    setValue(0);
  }
  const [symbol, setSymbol] = useState("BTC");
  function handleUnitChange(e) {
    setSymbol(e.target.value);
    console.log(e);
    console.log(e.currentTarget);
  }

  return (
    <div className={styles.main_box}>
      <h2>Coin Converter</h2>
      <p></p>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={styles.small_box}>
          {" "}
          <select
            onChange={(e) => {
              handleUnitChange(e);
            }}
          >
            {coins.map((coin) => {
              return (
                <option
                  key={coin.id}
                  value={coin.symbol}
                  data-price={coin.quotes.USD.price}
                >
                  {coin.name} - {coin.symbol} : {coin.quotes.USD.price} USD
                </option>
              );
            })}
          </select>
          <p></p>
          <div>
            <input
              id="usd"
              type="number"
              value={value}
              onChange={handleChange}
            />
            <label htmlFor="usd"> USD</label>
            <span> = </span>
            <input
              id="unit"
              type="number"
              value={value * 0.000015}
              onChange={handleChange}
            />
            <label htmlFor="unit"> {symbol}</label>
            <p></p>
            <button onClick={handleReset}>Reset ↩</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
