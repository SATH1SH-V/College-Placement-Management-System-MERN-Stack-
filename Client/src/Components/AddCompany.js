import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import toast from 'react-hot-toast';
import API from '../../../services/api';
import LoadingBackdrop from '../../ui/LoadingBackdrop';

function AddCompany() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        package: '',
        status: 'upcoming'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Artificial delay to show the backdrop (optional, but good for UX feel as requested)
            await new Promise(resolve => setTimeout(resolve, 1000));

            await API.post('/companies', formData);

            setIsLoading(false);
            toast.success('Company added successfully!');
            // Reset form to allow adding another
            setFormData({
                name: '',
                role: '',
                package: '',
                status: 'upcoming'
            });
        } catch (error) {
            console.error("Error adding company:", error);
            setIsLoading(false);
            toast.error('Failed to add company.');
        }
    };

    return (
        <div className="section main-content">
            <LoadingBackdrop loading={isLoading} message="Adding Company..." />

            <div className="section-header" style={{ justifyContent: 'flex-start', gap: '20px', marginTop: '20px' }}>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ background: 'white', border: '1px solid #ddd', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', color: '#166534', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    title="Back to Dashboard"
                >
                    <FaArrowLeft />
                </button>
                <h2 className="section-title" style={{ margin: 0 }}>Add New Company</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Company Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px', transition: 'border-color 0.2s' }}
                            placeholder="e.g. Google"
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Role</label>
                        <input type="text" name="role" value={formData.role} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' }}
                            placeholder="e.g. Software Engineer"
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Package (LPA)</label>
                        <input type="text" name="package" value={formData.package} onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' }}
                            placeholder="e.g. 24 LPA"
                        />
                    </div>
                    <button type="submit" className="drive-btn" style={{ width: '100%', padding: '16px', fontSize: '18px' }}>Add Company</button>
                </form>
            </div>
        </div>
    );
}

export default AddCompany;
