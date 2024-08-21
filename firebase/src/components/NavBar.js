import { Link } from "react-router-dom";

function NavBar({ isLoggedIn, handleLogOut, userEmail }) {
  return (
    <navbar>
      <Link to={"/signup"}>Auth/Stripe Test</Link>
      <div className="navbarInfo">
        <p>Welcome {userEmail}</p>
        <button onClick={handleLogOut}>{isLoggedIn}</button>
      </div>
    </navbar>
  );
}

export default NavBar;
