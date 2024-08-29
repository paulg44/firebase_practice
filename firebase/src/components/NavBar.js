import { Link } from "react-router-dom";
import "../css/navbar.css";

function NavBar({ isLoggedIn, handleLogOut, userEmail }) {
  return (
    <nav className="navBar">
      <Link to={"/"} className="logo">
        Auth/Stripe Test
      </Link>
      <div className="navbarInfo">
        <p>Welcome {userEmail}</p>
        {/* Need to remove completely if not logged in or signed up*/}
        {isLoggedIn === "Logout" ? (
          <Link to={"/"} onClick={handleLogOut} className="navbarBtn">
            Logout
          </Link>
        ) : (
          <Link to={"/login"} className="navbarBtn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
