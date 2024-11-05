import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav>
      <h1>Spotify Playlist Organizer</h1>
      <Link to="/">Home</Link>
    </nav>
  </header>
);

export default Header;