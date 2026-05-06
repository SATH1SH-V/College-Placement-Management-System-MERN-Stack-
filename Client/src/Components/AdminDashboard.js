import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaHistory, FaUserGraduate, FaBuilding, FaShieldAlt, FaUpload } from "react-icons/fa";
import API from '../../services/api';
import Shimmer from '../ui/Shimmer';

function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [stats, setStats] = useState({
        companies: 0,
        upcomingDrives: 0,
        pastDrives: 0,
        placedStudents: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin/login');
        }

        const fetchStats = async () => {
            try {
                const { data } = await API.get('/dashboard/stats');
                setStats(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin dashboard stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate, location.pathname]);


    const isOverview = location.pathname === '/admin/dashboard' || location.pathname === '/admin/dashboard/';

    return (
        <div className="fade-in" style={{ padding: '20px 0', maxWidth: '1200px', margin: '0 auto' }}>

            {/* 1. HEADER */}
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-soft)',
                color: 'var(--text-primary)',
                padding: '24px 32px',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
                boxShadow: 'var(--shadow-soft)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '12px', borderRadius: '12px' }}>
                        <FaShieldAlt size={24} color="var(--accent-primary)" />
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0', background: 'linear-gradient(135deg, #0f172a, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin Command Center</h1>
                </div>
            </div>

            {/* 2. STATS CARDS */}
            <div className="dashboard">
                {/* Upcoming Drives Card */}
                <Link to="/upcoming" className="stat-card green" style={{ textDecoration: 'none' }}>
                    <FaCalendarAlt className="stat-icon" />
                    <p>Upcoming Drives</p>
                    {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.upcomingDrives}</h2>}
                </Link>

                {/* Past Drives Card */}
                <Link to="/past" className="stat-card blue" style={{ textDecoration: 'none' }}>
                    <FaHistory className="stat-icon" />
                    <p>Past Drives</p>
                    {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.pastDrives}</h2>}
                </Link>

                {/* Placed Students Card */}
                <Link to="/placed" className="stat-card purple" style={{ textDecoration: 'none' }}>
                    <FaUserGraduate className="stat-icon" />
                    <p>Placed Students</p>
                    {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.placedStudents}</h2>}
                </Link>

                {/* Companies Card */}
                <Link to="/companies" className="stat-card orange" style={{ textDecoration: 'none' }}>
                    <FaBuilding className="stat-icon" />
                    <p>Companies</p>
                    {loading ? <Shimmer height="40px" width="60px" /> : <h2>{stats.companies}</h2>}
                </Link>
            </div>

            {/* 3. ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
                <Link to="/admin/add-company" style={{ textDecoration: 'none' }}>
                    <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaBuilding /> Add Company
                    </button>
                </Link>

                <Link to="/admin/add-drive" style={{ textDecoration: 'none' }}>
                    <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCalendarAlt /> Add Drive
                    </button>
                </Link>

                <Link to="/admin/add-student" style={{ textDecoration: 'none' }}>
                    <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaUserGraduate /> Add Student
                    </button>
                </Link>

                <Link to="/admin/upload-students" style={{ textDecoration: 'none' }}>
                    <button className="secondary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#10b981', borderColor: '#d1fae5' }}>
                        <FaUpload /> Bulk Upload
                    </button>
                </Link>
            </div>

            {/* 4. WELCOME CARD / OUTLET */}
            {isOverview ? (
                <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-soft)',
                    borderRadius: '24px',
                    padding: '80px 40px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-soft)',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2 style={{ fontSize: '36px', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                            Admin Dashboard
                    </h2>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
                        Welcome to the Placement Management System Admin Panel. 
                        From here you can manage students, companies, placement drives, 
                        and monitor placement activities efficiently.
                    </p>
                </div>
            ) : (
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)' }}>
                    <Outlet />
                </div>
            )}

        </div>
    );
}

export default AdminDashboard;
