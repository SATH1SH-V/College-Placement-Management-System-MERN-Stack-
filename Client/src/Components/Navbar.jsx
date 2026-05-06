import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserShield, FaGraduationCap } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="navbar fade-in-fast">
      <Link to="/" className="nav-title">
        <img src="/logo.png" alt="Logo" style={{ height: '40px', borderRadius: '8px' }} />
        <span>Placement Portal</span>
      </Link>

      <div className="nav-buttons">
        <button>
          <FaBell /> <span>Alerts</span>
        </button>

        {isAdmin ? (
          <button onClick={handleLogout} className="logout-btn">
            <FaUserShield /> <span>Logout</span>
          </button>
        ) : (
          <button onClick={() => navigate('/admin/login')} className="admin-btn">
            <FaUserShield /> <span>Admin</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;