import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.js";
import "../css/navbar.css";

function NavBar() {
  const { user, isLoading, logOut } = useAuth();

  const userEmail = user ? user.displayName : "Guest";
  const isLoggedIn = user !== null;

  if (isLoading) {
  }

  return (
    <nav className="navBar">
      <Link to={"/"} className="logo">
        Auth/Stripe Test
      </Link>
      <div className="navbarInfo">
        <p>Welcome {userEmail}</p>
        {/* Need to remove completely if not logged in or signed up*/}
        {isLoggedIn ? (
          <Link to={"/"} onClick={logOut} className="navbarBtn">
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
