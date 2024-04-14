import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  let selectedCoin;

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
  function handleUnitChange(e) {
    selectedCoin = e.target.value;
    console.log("one" + e.target.value);
  }
  console.log("two" + selectedCoin);
  // 화면 출력이 안됨

  return (
    <div className={styles.main_box}>
      <h2>Coin Converter</h2>
      <p></p>
      {loading ? (
        <strong>Loading...</strong>
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
                <option key={coin.id} value={coin.symbol}>
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
            <label htmlFor="unit">{selectedCoin}</label>
            <p></p>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
