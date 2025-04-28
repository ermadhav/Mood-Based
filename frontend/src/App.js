import React, { useState } from 'react';
import './App.css';

function App() {
  const [mood, setMood] = useState('');
  const [language, setLanguage] = useState('Any language');
  const [trackId, setTrackId] = useState('');

  const handleMusic = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getMusic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, language }),
      });

      const data = await response.json();
      if (data.id) {
        setTrackId(data.id);
      } else {
        setTrackId('');
        alert('No song found.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <main>
        <section id="intro">
          <form id="moodForm">
            <h1>Mood-Based Music Recommender</h1>
            <div className="input-container">
              <input
                id="mood"
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="Describe your mood..."
              />
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Any language">Random</option>
                <option value="Arabic">Arabic</option>
                <option value="Chinese">Chinese</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Hindi">Hindi</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Russian">Russian</option>
                <option value="Spanish">Spanish</option>
                <option value="Turkish">Turkish</option>
              </select>
              <button type="button" id="music" onClick={handleMusic}>
                Get Music
              </button>
            </div>
            
            <div id="embed-iframe">
              {trackId && (
                <iframe
                  src={`https://open.spotify.com/embed/track/${trackId}`}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Spotify Player"
                ></iframe>
              )}
            </div>
          </form>
        </section>

        {/* <section id="second">
          <footer>
            <p>
              This site helps you find music that matches your current mood.
              Whether you're feeling happy, sad, or anything in between, simply
              describe your mood, select a language, and discover a playlist that
              resonates with you.
            </p>
            <p style={{ fontSize: '25px' }}>Sample Mood-Based Prompts</p>
            <div className="container">
              <p className="text">I feel unhappy right now</p>
              <p className="text">I tried so hard to love her</p>
              <p className="text">I think I've fallen in love</p>
              <p className="text">I feel very energized</p>
              <p className="text">I feel like doing nothing today</p>
              <p className="text">I need to dance</p>
              <p className="text">I feel very energized</p>
              <p className="text">I don't feel like going to school</p>
              <p className="text">I'm quiet and depressive</p>
              <p className="text">I beat cancer</p>
              <p className="text">I'm so happy today</p>
              <p className="text">I feel like crying for no reason</p>
              <p className="text">I regret it very much.</p>
              <p className="text">I want to be loved too</p>
            </div>
          </footer>
        </section> */}

        {/* <section id="warning"> */}
          {/* <footer>
            <div className="container">
              <p style={{ fontSize: '25px', color: 'wheat' }}>Warnings</p>
              <p>→ You need to log in to Spotify to listen to the full songs</p>
              <p>→ Mobile devices always have to see the preview</p>
              <p>→ Get Playlist may not always work correctly</p>
              <p>→ You don't get music against immoral prompts</p>
              <p className="text">Created by Faruk TUTKUS</p>
            </div>
          </footer> */}
        {/* </section> */}
      </main>
    </div>
  );
}

export default App;
