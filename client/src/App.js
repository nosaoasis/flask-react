import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Home, About, Contact, CreateArticle, SingleArticle } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/article/:id" element={<SingleArticle />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
