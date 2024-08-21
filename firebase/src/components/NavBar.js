import { Link } from "react-router-dom";

function NavBar({ isLoggedIn, handleLogOut, userEmail }) {
  return (
    <nav>
      <Link to={"/"}>Auth/Stripe Test</Link>
      <div className="navbarInfo">
        <p>Welcome {userEmail}</p>
        {isLoggedIn === "Logout" ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
