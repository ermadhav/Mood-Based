const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Spotify Auth
let accessToken = '';

async function getSpotifyAccessToken() {
    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
                ).toString('base64')
            }
        }
    );
    accessToken = response.data.access_token;
}

// Get Music from Spotify based on mood
app.post('/api/getMusic', async (req, res) => {
    const { mood, language } = req.body;

    try {
        if (!accessToken) {
            await getSpotifyAccessToken();
        }

        const query = `${mood} ${language}`; // Example: "happy English"

        const response = await axios.get(
            `https://api.spotify.com/v1/search`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                params: {
                    q: query,
                    type: 'track',
                    limit: 1
                }
            }
        );

        const tracks = response.data.tracks.items;
        if (tracks.length > 0) {
            const track = tracks[0];
            res.json({
                id: track.id,
                name: track.name,
                artists: track.artists.map(a => a.name),
                externalUrl: track.external_urls.spotify
            });
        } else {
            res.status(404).json({ message: 'No track found' });
        }
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('Server Error');
    }
});

// Refresh token every 30 minutes (tokens expire)
setInterval(getSpotifyAccessToken, 1000 * 60 * 30);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    getSpotifyAccessToken();
});
