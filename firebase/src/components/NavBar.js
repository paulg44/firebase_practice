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
          <button onClick={handleLogOut} className="navbarBtn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
