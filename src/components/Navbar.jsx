import { NavLink } from 'react-router-dom';

function Navbar() {
  const links = [
    { to: '/', label: 'Dashboard', icon: '⌂' },
    { to: '/products', label: 'Products', icon: '◫' },
    { to: '/products/create', label: 'Add Product', icon: '+' },
  ];

  return (
    <aside className="sidebar">
      <div className="brand-row">
        <span className="brand-icon">◌</span>
        <h1 className="brand">DarkPan</h1>
      </div>

      <div className="profile-box">
        <img
          className="profile-avatar"
          src="https://i.pravatar.cc/80?img=12"
          alt="profile"
        />
        <div>
          <p className="profile-name">Abdullaew Sunnat</p>
          <p className="profile-role">Admin</p>
        </div>
      </div>

      <nav className="nav-list">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <span className="nav-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Navbar;
