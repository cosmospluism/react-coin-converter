import { useState, useEffect } from "react";
import styles from "./App.module.css";
import ribbon from "./ribbon.png";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const getCoin = async () => {
    const json = await (
      await fetch("https://api.coinpaprika.com/v1/tickers")
    ).json();
    setCoins(json);
    setLoading(false);
  };

  useEffect(() => {
    getCoin();
  }, []);

  const [value, setValue] = useState(1);
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleReset() {
    setValue("");
  }

  const [symbol, setSymbol] = useState("BTC");
  const [coinPrice, setCoinPrice] = useState(0);
  function handleUnitChange(e) {
    setSymbol(e.target.value);
    setCoinPrice(e.target[e.target.selectedIndex].getAttribute("data-price"));
  }

  const [Inverted, setInverted] = useState(false);
  function handleInvert() {
    setValue(0);
    setInverted((prev) => !prev);
  }

  return (
    <div className={styles.main_box}>
      <div className={styles.title}>
        {" "}
        <h2>Coin Converter</h2>
        <img src={ribbon} alt="ribbon icon" />
      </div>
      {loading ? null : (
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
          <div className={styles.label_box}>
            <input
              id="usd"
              type="number"
              value={Inverted ? value * coinPrice : value}
              onChange={handleChange}
              disabled={Inverted}
              min={0}
            />
            <label htmlFor="usd">USD</label>
            <span> = </span>
            <input
              id="unit"
              type="number"
              value={Inverted ? value : (value / coinPrice).toFixed(6)}
              onChange={handleChange}
              disabled={!Inverted}
              min={0}
            />
            <label htmlFor="unit">{symbol}</label>
            <p></p>
            <button onClick={handleReset}>Reset ↩</button>
            <button onClick={handleInvert}>Invert ⇆</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
