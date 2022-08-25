import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";

const CreateArticle = () => {
  return (
    <>
      <ArticleForm btnValue="Create Article" />
    </>
  );
};

export default CreateArticle;
