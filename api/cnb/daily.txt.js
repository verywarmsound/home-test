// Vercel serverless function to proxy CNB API requests
// This solves CORS issues by making the request server-side

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Fetch data from CNB API
    const cnbResponse = await fetch(
      'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
      {
        headers: {
          'Accept': 'text/plain',
        },
      }
    );

    if (!cnbResponse.ok) {
      throw new Error(`CNB API responded with status: ${cnbResponse.status}`);
    }

    const data = await cnbResponse.text();
    
    // Return the data with proper content type
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(data);

  } catch (error) {
    console.error('Error fetching CNB data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch exchange rates',
      message: error.message 
    });
  }
}
