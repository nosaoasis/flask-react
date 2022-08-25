import { useEffect, useState } from "react";
import axios from "axios";
import ArticleList from "../components/ArticleList";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get`)
      .then((resp) => {
        setArticles(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const articlesList = articles.map((article) => {
    return (
      <>
        <ArticleList key={article.id} {...article} />
      </>
    );
  });

  return (
    <>
      <div className="App">
        <h1>Flask React Blog Application</h1>
      </div>
      <div>
        <p>Articles</p>
      </div>
      <hr />
      <article>{articlesList}</article>
    </>
  );
};

export default Home;
