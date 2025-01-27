import { Link, useHistory } from "react-router-dom";

export const NavBar = () => {
  const history = useHistory();

  return (
    <nav
      data-aos="fade-down"
      data-aos-anchor=".nav-bar"
      data-aos-offset="200"
      data-aos-duration="1500"
      data-aos-easing="ease"
      data-aos-mirror="true"
      data-aos-once="false"
      className="nav-bar"
    >
      <Link to="/" className="logo" />

      <div className="nav-content">
        <Link to="/" className="nav-links">
          Home
        </Link>
        <Link to="/about" className="nav-links">
          About
        </Link>
        <Link to="/chat" className="nav-links">
          Chat
        </Link>
      </div>
      <div className="nav-login">
        <Link
          onClick={() => {
            history.push("/signup");
          }}
          className="nav-call"
        >
          Singup
        </Link>
        <Link to="/login" className="link">
          Login
        </Link>
      </div>
    </nav>
  );
};
