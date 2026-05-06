import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import toast from 'react-hot-toast';
import API from '../../../services/api';
import LoadingBackdrop from '../../ui/LoadingBackdrop';

function AddDrive() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        company: '',
        date: '',
        time: '',
        eligibility: '',
        description: '',
        interviewQuestions: ''
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
            const payload = {
                ...formData,
                eligibility: formData.eligibility ? formData.eligibility.split(',').map(item => item.trim()) : [],
                interviewQuestions: formData.interviewQuestions ? formData.interviewQuestions.split('\n').filter(q => q.trim() !== '') : []
            };

            await new Promise(resolve => setTimeout(resolve, 1000)); // UX Delay
            await API.post('/drives', payload);

            setIsLoading(false);
            toast.success('Placement Drive added successfully!');

            // Reset form
            setFormData({
                company: '',
                date: '',
                time: '',
                eligibility: '',
                description: '',
                interviewQuestions: ''
            });

        } catch (error) {
            console.error("Error adding drive:", error);
            setIsLoading(false);
            toast.error('Failed to add drive.');
        }
    };

    return (
        <div className="section main-content">
            <LoadingBackdrop loading={isLoading} message="Scheduling Drive..." />

            <div className="section-header" style={{ justifyContent: 'flex-start', gap: '20px', marginTop: '20px' }}>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ background: 'white', border: '1px solid #ddd', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', color: '#166534', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    title="Back to Dashboard"
                >
                    <FaArrowLeft />
                </button>
                <h2 className="section-title" style={{ margin: 0 }}>Add Placement Drive</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Company</label>
                        <select name="company" value={formData.company} onChange={handleChange} required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '16px' }}>
                            <option value="">Select Company</option>
                            {companies.map(comp => (
                                <option key={comp._id} value={comp._id}>{comp.name} - {comp.role}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb' }} />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Time</label>
                            <input type="time" name="time" value={formData.time} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb' }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Eligibility (comma separated)</label>
                        <input type="text" name="eligibility" value={formData.eligibility} onChange={handleChange} placeholder="CSE, IT, ECE" required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb' }} />
                    </div>

                    {/* Dynamic Field based on Date */}
                    {new Date(formData.date) > new Date() ? (
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Job Description / Details</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Enter job description, roles, and benefits..."
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}></textarea>
                        </div>
                    ) : (
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Interview Questions (one per line)</label>
                            <textarea name="interviewQuestions" value={formData.interviewQuestions} onChange={handleChange} rows="5" placeholder="Enter questions asked during the interview..."
                                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}></textarea>
                        </div>
                    )}
                    <button type="submit" className="drive-btn" style={{ width: '100%', padding: '16px', fontSize: '18px' }}>Schedule Drive</button>
                </form>
            </div>
        </div>
    );
}

export default AddDrive;
