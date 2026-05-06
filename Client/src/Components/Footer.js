import { FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ marginTop: 'auto', background: 'var(--bg-card)', borderTop: '1px solid var(--border-soft)', padding: '40px 0', color: 'var(--text-secondary)' }}>
      <div className="main-content" style={{ minHeight: 'auto', paddingBottom: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              <FaGraduationCap size={24} color="var(--accent-primary)" />
              <span>Placement Portal</span>
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
              Empowering students with exciting career opportunities. We bridge the gap between academic excellence and industry demands.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="/upcoming" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Upcoming Drives</a></li>
              <li><a href="/past" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Past Drives</a></li>
              <li><a href="/placed" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Placed Students</a></li>
              <li><a href="/companies" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Our Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaMapMarkerAlt color="var(--accent-primary)" /> 123 University Campus, Placement Block</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaPhone color="var(--accent-primary)" /> +1 234 567 8900</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaEnvelope color="var(--accent-primary)" /> placement@university.edu</li>
            </ul>
          </div>

        </div>
        
        <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} College Placement Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
