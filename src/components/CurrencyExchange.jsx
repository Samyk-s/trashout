import { useState } from 'react';
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
      <div style={styles.card}>
        <h1 style={styles.title}>Currency Exchange</h1>
        <div style={styles.inputContainer}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
            placeholder="Amount"
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
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#6a11cb',
  },
  select: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  selectFocus: {
    borderColor: '#6a11cb',
  },
  arrow: {
    fontSize: '1.5rem',
    color: '#666',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    background: 'linear-gradient(135deg, #2575fc, #6a11cb)',
  },
  result: {
    marginTop: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  error: {
    color: '#ff4d4d',
    marginTop: '10px',
  },
};

export default CurrencyExchange;