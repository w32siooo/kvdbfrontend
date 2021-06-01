import "./App.css";
import { useState, useEffect } from "react";

const getEntry = async (query) => {
  const url = `https://kv-db.aadh.workers.dev/${query}?key=`;

  const resp = await fetch(url, {
    method: "GET",
    //body: JSON.stringify({ query }),
    headers: { "Content-type": "application/json" },
  });

  return resp.json();
};

const setEntry = async (query) => {
  const url = `https://kv-db.aadh.workers.dev/?key=`;

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-type": "application/json" },
  });

  return resp.json();
};

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState(null);

  const updateEntries = async () => {
    const results = await getEntry(query);
    setImages(results.data.query);
  };

  const postToDB = async () => {
    const results = await setEntry(query);
  };

  const updateQuery = (evt) => setQuery(evt.target.value);

  return (
    <div className="App">
      <div class="form">
        <input
          id="query"
          type="text"
          onChange={updateQuery}
          placeholder="Search query"
        />
        <button onClick={updateEntries}>Search</button>
      </div>
      <div class="form">
        <input
          id="query"
          type="text"
          onChange={updateQuery}
          placeholder="Insert query"
        />
        <button onClick={postToDB}>Insert</button>
        Response from api: {images}
      </div>
    </div>
  );
}

export default App;
