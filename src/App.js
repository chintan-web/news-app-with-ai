import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/newsCards/NewsCards";
import { Typography } from "@material-ui/core";
import wordsToNumbers from "words-to-numbers";

import Modal from "./components/Modal/Modal";

import useStyles from "./styles";

const alanKey =
  "5576248ab0c7bd89b52edb80a024443c2e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "instructions") {
          setIsOpen(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src="data:image/jpeg;base64,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"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://github.com/chintan-web">
              Chintan
            </a>
          </Typography>
        </div>
      ) : null}
    </div>
  );
}

export default App;
