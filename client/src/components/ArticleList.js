import { Link } from "react-router-dom";

const ArticleList = (props) => {
  const { id, title, body, date } = props;

  return (
    <>
      <h3>
        <Link to={`/article/${id}`}>{title}</Link>
      </h3>
      <p>{body}</p>
      <span>
        <strong>Published:</strong> {date}
      </span>
      <hr />
    </>
  );
};

export default ArticleList;
