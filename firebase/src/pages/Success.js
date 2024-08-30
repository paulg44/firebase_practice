import { Link } from "react-router-dom";
import "../css/success.css";

function Success({ userEmail }) {
  return (
    <div className="successContainer">
      <h2>
        Thanks for your order {userEmail}. You have successfully bought an item!
      </h2>
      <Link to={"/home"} className="navbarBtn">
        Back to products
      </Link>
    </div>
  );
}

export default Success;
