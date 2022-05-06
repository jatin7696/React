import react from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Signin");
  };
  return (
    <div>
      <ul className="Nav-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Add">Add Product</Link>
        </li>
        <li>
          <Link to="/Update">Update Product</Link>
        </li>
        <li></li>
        <li>
          <Link to="/Profile">Profile</Link>
        </li>
        <li>
          {auth ? (
            <Link to="/Logout" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to="/SignUp">SignUp</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
