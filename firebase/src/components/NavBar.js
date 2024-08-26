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
        {isLoggedIn === "Logout" ? (
          <button onClick={handleLogOut} className="navbarBtn">
            Logout
          </button>
        ) : (
          // Need to remove this if already on login page
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
