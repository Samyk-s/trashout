import React, { useState } from 'react';
import axios from 'axios';

const CurrencyExchange = () => {
  const [amount, setAmount] = useState(750);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const convertCurrency = async () => {
    const options = {
      method: 'GET',
      url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount
      },
      headers: {
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
        'X-RapidAPI-Key': '4072bac47bmsh0c12ac58a5f681fp12b399jsn08dd165c22a7'
      }
    };

    try {
      const response = await axios.request(options);
      setConvertedAmount(response.data.result);
      setError(null);
    } catch (err) {
      setError('Error converting currency. Please try again.');
      setConvertedAmount(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Currency Exchange</h1>
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={styles.select}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          {/* Add more currencies as needed */}
        </select>
        <span style={styles.arrow}>&rarr;</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={styles.select}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          {/* Add more currencies as needed */}
        </select>
        <button onClick={convertCurrency} style={styles.button}>
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div style={styles.result}>
          <h2>
            Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
          </h2>
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  arrow: {
    fontSize: '1.5rem',
    color: '#666',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  result: {
    marginTop: '20px',
    fontSize: '1.5rem',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default CurrencyExchange;