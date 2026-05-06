import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import toast from 'react-hot-toast';
import API from '../../../services/api';
import LoadingBackdrop from '../../ui/LoadingBackdrop';

function AddStudent() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        department: 'CSE',
        company: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const { data } = await API.get('/companies');
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };
        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // UX Delay
            await API.post('/students/placed', formData);

            setIsLoading(false);
            toast.success('Student added successfully!');

            // Reset form
            setFormData({
                name: '',
                studentId: '',
                department: 'CSE',
                company: ''
            });
        } catch (error) {
            console.error("Error adding student:", error);
            setIsLoading(false);
            toast.error('Failed to add student.');
        }
    };

    return (
        <div className="section main-content">
            <LoadingBackdrop loading={isLoading} message="Adding Student..." />

            <div className="section-header" style={{ justifyContent: 'flex-start', gap: '20px', marginTop: '20px' }}>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ background: 'white', border: '1px solid #ddd', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', color: '#166534', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    title="Back to Dashboard"
                >
                    <FaArrowLeft />
                </button>
                <h2 className="section-title" style={{ margin: 0 }}>Add Placed Student</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Student Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Student ID</label>
                        <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Department</label>
                        <select name="department" value={formData.department} onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' }}>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="MECH">MECH</option>
                            <option value="CIVIL">CIVIL</option>
                            <option value="AIDS">AIDS</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Company (Placed In)</label>
                        <select name="company" value={formData.company} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' }}>
                            <option value="">Select Company</option>
                            {companies.map(comp => (
                                <option key={comp._id} value={comp._id}>{comp.name} - {comp.role}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="drive-btn" style={{ width: '100%', padding: '16px', fontSize: '18px' }}>Add Student</button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;
