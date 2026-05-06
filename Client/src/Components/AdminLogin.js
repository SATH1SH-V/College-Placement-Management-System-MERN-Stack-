import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded check for now - can be enhanced later
        if (email === 'admin@college.edu' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
    };

    const formStyle = {
        background: 'white',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-soft)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        border: '1px solid var(--border-soft)'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        margin: '10px 0',
        border: '1px solid var(--border-soft)',
        borderRadius: '12px',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.3s ease'
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleLogin} className="fade-in">
                <div style={{ background: 'var(--bg-light)', display: 'inline-block', padding: '15px', borderRadius: '50%', marginBottom: '20px' }}>
                    <FaLock size={30} color="var(--accent-primary)" />
                </div>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontWeight: '700' }}>Admin Login</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '30px' }}>Enter your credentials to access the command center</p>
                
                <div style={{ textAlign: 'left', marginBottom: '16px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email Address</label>
                    <input
                        type="email"
                        placeholder="admin@college.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={{ textAlign: 'left', marginBottom: '24px', position: 'relative' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ ...inputStyle, paddingRight: '45px' }}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>
                </div>
                <button type="submit" className="drive-btn" style={{ width: '100%', marginTop: '20px' }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
