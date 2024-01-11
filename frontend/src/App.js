import React, { useState, useEffect } from "react";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        // Fetching cryptocurrency list from CryptoCompare API
        const apiKey =
          "d4f683327d3ad228ea83784866b01e88679499b4eaa6c7e9f14eb7a5c2cc2151";
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${apiKey}`
        );

        const { Data } = await response.json();

        const allowedCurrencies = [
          "BTC",
          "ETH", // Add Bitcoin and Ethereum at the beginning
          "BNB",
          "ADA",
          "XRP",
          "SOL",
          "DOT",
          "DOGE",
          "USDC",
          "AVAX",
          "LINK",
          "LTC",
          "BCH",
          "XLM",
          "ALGO",
          "UNI",
          "WBTC",
          "LUNA",
          "VET",
          "ATOM",
          "TRX",
          "XMR",
          "FIL",
          "XTZ",
          "MIOTA",
          "AAVE",
          "SHIB",
          "HBAR",
          "THETA",
          "FTT",
          "CAKE",
          "CRO",
          "MKR",
          "NEO",
          "EOS",
          "DASH",
          "KSM",
          "BTT",
          "CHESS",
          "COMP",
          "EGLD",
          "MANA",
          "ZEC",
          "HT",
          "SUSHI",
          "GRT",
          "SNX",
          "CEL",
          "OKB",
          "ONE",
          "WAVES",
          "CHZ",
          "ENJ",
          "HOT",
          "CELO",
          "REN",
          "RSR",
          "ZRX",
          "QTUM",
          "XEM",
          "CRV",
          "BAT",
          "OMG",
          "NEXO",
          "CHSB",
          "ICX",
          "TUSD",
          "ANKR",
          "ZEN",
          "STX",
          "SRM",
          "KCS",
          "DENT",
          "WRX",
          "AR",
          "ONT",
          "VGX",
          "SC",
          "BNT",
          "RENBTC",
          "UMA",
          "REP",
          "LRC",
          "RARI",
          "PERP",
          "BAND",
          "KP3R",
          "KAVA",
          "OCEAN",
          "BAL",
          "RSV",
          "FET",
          "CKB",
          "TWT",
          "HUSD",
          "SCRT",
          "RUNE",
          // Add more currencies as needed
        ];

        const cryptoCurrencies = allowedCurrencies.map((symbol) => ({
          id: Data[symbol].Symbol,
          symbol: Data[symbol].Symbol,
        }));

        setCurrencies(cryptoCurrencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        alert("Error fetching currencies. Please try again.");
      }
    };

    // Fetch the currencies on page load
    fetchCurrencies();
  }, []);

  const convert = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    // CryptoCompare API endpoint for price conversion
    const apiKey =
      "d4f683327d3ad228ea83784866b01e88679499b4eaa6c7e9f14eb7a5c2cc2151";
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${fromCurrency}&tsyms=${toCurrency}&api_key=${apiKey}`;

    try {
      // Fetch conversion data from CryptoCompare
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if conversion data is available
      if (data && data[toCurrency]) {
        const conversionResult = data[toCurrency];
        setResult(
          `${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`
        );
      } else {
        alert("Error fetching data. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching data. Please try again.");
    }
  };

  return (
    <div>
      <div id="dzapText">DZap</div>
      <div id="cryptoConverter">
        <h2>Crypto Converter</h2>
        <label htmlFor="fromCurrency">From:</label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.symbol}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="toCurrency">To:</label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.symbol}
            </option>
          ))}
        </select>

        <button onClick={convert}>Convert</button>

        <div id="result">{result}</div>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1280px-Bitcoin.svg.png"
          alt="Bitcoin Logo"
          id="bitcoinLogo"
        />
      </div>
    </div>
  );
};

export default App;
