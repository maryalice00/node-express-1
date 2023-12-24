const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const GITHUB_API_URL = 'https://api.github.com/users/';

app.post('/', async (req, res) => {
  try {
    const { developers } = req.body;

    if (!developers || !Array.isArray(developers)) {
      return res.status(400).json({ error: 'Invalid request. Provide an array of GitHub usernames.' });
    }

    const results = await Promise.all(developers.map(getDeveloperInfo));

    res.json(results);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getDeveloperInfo(username) {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${username}`);
    const { name, bio } = response.data;

    return { name, bio };
  } catch (error) {
    console.error(`Error fetching data for ${username}: ${error.message}`);
    return { name: null, bio: null };
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
