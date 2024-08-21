import { Link } from "react-router-dom";

function NavBar({ isLoggedIn, handleLogOut, userEmail }) {
  return (
    <navbar>
      <Link to={"/"}>Auth/Stripe Test</Link>
      <div className="navbarInfo">
        <p>Welcome {userEmail}</p>
        {isLoggedIn === "Logout" ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </navbar>
  );
}

export default NavBar;
