const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // Update with the actual origin of your frontend application
    methods: 'POST',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const apiUrl = 'https://min-api.cryptocompare.com/data/price';
const apiKey = 'd4f683327d3ad228ea83784866b01e88679499b4eaa6c7e9f14eb7a5c2cc2151'; // Replace with your actual API key

app.post('/convert', async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        fsym: fromCurrency,
        tsyms: toCurrency,
        api_key: apiKey,
      },
    });

    const data = response.data;

    if (data && data[toCurrency]) {
      const conversionResult = data[toCurrency];
      res.json({
        result: `${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`,
      });
    } else {
      res.status(500).json({ error: 'Error fetching data. Please try again.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching data. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
