import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleForm = (props) => {
  const { id, title, body, btnValue, setEditArticle, setArticle } = props;
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    title: title || "",
    body: body || "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setformData({ ...formData, [name]: value });
  };

  const handleHideForm = () => {
    setEditArticle(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios
      .patch(`http://localhost:5000/update/${id}`, { formData })
      .then((resp) => {
        setArticle(resp.data);
      })
      .catch((err) => console.error("this is the error that occured", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:5000/add`, { formData })
      .then((resp) => {
        setformData({
          title: "",
          body: "",
        });
        navigate("/");
      })
      .catch((err) => console.error("error value is ", err));
  };

  return (
    <>
      {setEditArticle && <button onClick={handleHideForm}>hide edit</button>}
      <form>
        <input
          type="text"
          value={formData.title}
          onChange={handleChange}
          name="title"
        />
        <textarea value={formData.body} onChange={handleChange} name="body">
          {formData.body}
        </textarea>
        {id == null ? (
          <button onClick={handleSubmit}>{btnValue}</button>
        ) : (
          <button onClick={handleUpdate}>{btnValue}</button>
        )}
      </form>
    </>
  );
};

export default ArticleForm;
