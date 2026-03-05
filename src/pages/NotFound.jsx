import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page">
      <h2>404 - Not Found</h2>
      <Link to="/" className="nav-link">
        Home ga qaytish
      </Link>
    </section>
  );
}

export default NotFound;
