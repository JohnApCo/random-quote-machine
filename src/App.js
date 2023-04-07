import "./App.css";
import React, { useEffect, useState } from "react";

const config = {
  apiUrl: "https://api.quotable.io/random",
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState([]);
  const [color, setColor] = useState("");

  const getRandomQuote = () => {
    setQuote([]);
    setIsLoading(true);
    fetch(config.apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setQuote(data);
        setIsLoading(false);
        setColor(
          `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
            Math.random() * 256
          )},${Math.floor(Math.random() * 256)})`
        );
        console.log(color);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div
      className="App"
      style={{
        background: color,
      }}
    >
      <div
        id="quote-box"
        className="wrapper "
        style={{
          color: color,
        }}
      >
        <h4>Quote of the Day</h4>
        <div
          className={isLoading ? `content` : "content fadeIn"}
          style={{
            borderColor: color,
          }}
        >
          <div id="text" className="text">
            <i className="fa fa-quote-left" />
            <span>{quote.content}</span>
            <i className="fas fa-quote-right"></i>
          </div>
          <div id="author" className="author">
            <span>--</span>
            <span>{quote.author}</span>
          </div>
        </div>
        <div className="buttons">
          <a
            id="tweet-quote"
            className="button"
            style={{
              backgroundColor: color,
            }}
            href="https://twitter.com/intent/tweet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <button
            id="new-quote"
            style={{
              backgroundColor: color,
            }}
            className="button"
            onClick={() => getRandomQuote()}
          >
            New Quote
          </button>
        </div>
      </div>
      <p className="footer">By JohnApCo</p>
    </div>
  );
}

export default App;
