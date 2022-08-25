import { FaHome, FaRegEnvelope } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <ul>
          <li>
            <Link className="link" to="/">
              <FaHome />
              &nbsp; Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              <GrDocumentText /> &nbsp; About
            </Link>
          </li>
          <li>
            <Link className="link" to="/create">
              <BsPlusLg /> &nbsp; Create
            </Link>
          </li>
          <li>
            <Link className="link" to="/contact">
              <FaRegEnvelope /> &nbsp; Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
