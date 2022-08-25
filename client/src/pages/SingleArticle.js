import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArticleForm from "../components/ArticleForm";

const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const [editArticle, setEditArticle] = useState(false);

  const navigate = useNavigate();

  const linkParams = useParams();
  const { id } = linkParams;

  const handleEditArticle = () => {
    setEditArticle(true);
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((resp) => {
        navigate("/");
      })
      .catch((err) => console.log("this error occured ", err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/${id}`)
      .then((resp) => {
        setArticle(resp.data);
      })
      .catch((err) => console.error("error value is ", err));
  }, []);

  console.log("get article value is ", article);

  return (
    <>
      {editArticle && (
        <ArticleForm
          id={id}
          btnValue="Update Blog"
          title={article.title}
          body={article.body}
          setEditArticle={setEditArticle}
          setArticle={setArticle}
        />
      )}

      {article && (
        <>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
          <div className="single-article-btns-div">
            <button className="edit-article" onClick={handleEditArticle}>
              Edit
            </button>
            <button className="delete-article" onClick={handleDelete}>
              delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SingleArticle;
