import { useState, useEffect } from "react";
import "./styles.css";
// make a "search box" DONE
// when user types new input, update the userSearchTerm DONE
// when use submits, send a new fetch request that will ultimately setStories(qwdjqwodij) DONE

// https://hn.algolia.com/api - page parameter
export default function App() {
  const [stories, setStories] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");

  useEffect(() => {
    search(userSearchTerm);
  }, [userSearchTerm]);

  const search = (userSearchTerm) => {
    fetch(`https://hn.algolia.com/api/v1/search?query=${userSearchTerm}`)
      // fetch(`https://hn.algolia.com/api/v1/search?query=${userSearchTerm}&page=${page}`)
      .then((response) => response.json())
      .then((response) => setStories(response.hits));
  };

  return (
    <div className="App">
      <div style={{ background: "yellow" }}>
        <input
          value={userSearchTerm}
          onChange={(event) => setUserSearchTerm(event.target.value)}
          placeholder={"Let's search for something"}
        />
        <button onClick={search}>Search</button>
      </div>
      {stories.map((story) => (
        <li>
          <a href={story.url} target="_blank">
            {story.title}
          </a>
        </li>
      ))}
    </div>
  );
}
