import React, { useState } from "react";
import "./App.css";
function App() {
  const [mood, setMood] = useState("");
  const [language, setLanguage] = useState("Any language");
  const [trackId, setTrackId] = useState("");

  const handleMusic = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getMusic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, language }),
      });

      const data = await response.json();
      if (data.id) {
        setTrackId(data.id);
      } else {
        setTrackId("");
        alert("No song found.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <main className="main-content">
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
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
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
      </main>

      <footer>
        Copyright © 2025 All rights reserved | This Project is made with ❤️ by
        Madhav Tiwari
      </footer>
    </div>
  );
}

export default App;
