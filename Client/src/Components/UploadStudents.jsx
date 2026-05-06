import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileExcel, FaUpload, FaCheckCircle, FaExclamationTriangle, FaDownload, FaInfoCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import API from '../../../services/api';
import LoadingBackdrop from '../../ui/LoadingBackdrop';

function UploadStudents() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadResponse, setUploadResponse] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadResponse(null);
    };

    const downloadSample = () => {
        const csvContent = "Name,Student ID,Department,Company Name\nJohn Doe,STUD001,CSE,Google\nJane Smith,STUD002,IT,Microsoft";
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'placement_sample.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setIsLoading(true);
        try {
            const { data } = await API.post('/students/upload-excel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUploadResponse(data);
            setIsLoading(false);
            toast.success('Excel upload processed!');
        } catch (error) {
            console.error("Error uploading Excel:", error);
            setIsLoading(false);
            toast.error(error.response?.data?.message || 'Failed to upload Excel file.');
        }
    };

    return (
        <div className="section main-content fade-in">
            <LoadingBackdrop loading={isLoading} message="Processing Spreadsheet..." />

            <div className="section-header" style={{ justifyContent: 'flex-start', gap: '20px', marginTop: '20px' }}>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="secondary-btn"
                    style={{ padding: '10px 15px', borderRadius: '12px' }}
                    title="Back to Dashboard"
                >
                    <FaArrowLeft />
                </button>
                <h2 className="section-title" style={{ margin: 0 }}>Bulk Upload Students</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-soft)', textAlign: 'center' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ fontSize: '60px', color: 'var(--accent-primary)', marginBottom: '20px' }}>
                            <FaFileExcel />
                        </div>
                        <h3 style={{ marginBottom: '10px' }}>Upload Placement List</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                            Upload an Excel (.xlsx) or CSV file containing student placement data.
                        </p>
                        
                        <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '12px', textAlign: 'left', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '13px' }}>
                                <FaInfoCircle /> Required Sheet Format:
                            </div>
                            <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', background: 'white', borderRadius: '6px', overflow: 'hidden' }}>
                                <thead>
                                    <tr style={{ background: '#e2e8f0' }}>
                                        <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>Name</th>
                                        <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>Student ID</th>
                                        <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>Department</th>
                                        <th style={{ padding: '6px', border: '1px solid #cbd5e1' }}>Company Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>John Doe</td>
                                        <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>21CS001</td>
                                        <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>CSE</td>
                                        <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>Google</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button 
                                type="button"
                                onClick={downloadSample}
                                style={{ 
                                    marginTop: '15px', 
                                    background: 'none', 
                                    border: 'none', 
                                    color: 'var(--accent-primary)', 
                                    fontSize: '13px', 
                                    fontWeight: '600', 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: 0
                                }}
                            >
                                <FaDownload /> Download Sample CSV
                            </button>
                        </div>
                    </div>

                    <div style={{ 
                        border: '2px dashed var(--border-soft)', 
                        padding: '30px', 
                        borderRadius: '16px', 
                        marginBottom: '30px',
                        background: '#f8fafc',
                        position: 'relative'
                    }}>
                        <input 
                            type="file" 
                            accept=".xlsx, .xls, .csv" 
                            onChange={handleFileChange}
                            required
                            style={{ 
                                opacity: 0, 
                                position: 'absolute', 
                                top: 0, left: 0, width: '100%', height: '100%', 
                                cursor: 'pointer' 
                            }}
                        />
                        <div style={{ pointerEvents: 'none' }}>
                            <FaUpload style={{ fontSize: '24px', color: 'var(--text-secondary)', marginBottom: '10px' }} />
                            <p style={{ fontWeight: '500' }}>
                                {file ? file.name : "Click to select or drag and drop"}
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Excel or CSV files only</p>
                        </div>
                    </div>

                    <button type="submit" className="primary-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} disabled={!file || isLoading}>
                        <FaUpload /> Start Upload
                    </button>
                </form>

                {uploadResponse && (
                    <div style={{ 
                        width: '100%', 
                        maxWidth: '800px', 
                        background: 'white', 
                        padding: '30px', 
                        borderRadius: '24px', 
                        boxShadow: 'var(--shadow-soft)', 
                        border: '1px solid var(--border-soft)',
                        animation: 'fadeIn 0.5s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', color: 'var(--success)' }}>
                            <FaCheckCircle size={24} />
                            <h3 style={{ margin: 0 }}>{uploadResponse.message}</h3>
                        </div>

                        {uploadResponse.errors && uploadResponse.errors.length > 0 && (
                            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '20px', borderRadius: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d97706', marginBottom: '10px', fontWeight: '600' }}>
                                    <FaExclamationTriangle />
                                    <span>Some rows could not be imported:</span>
                                </div>
                                <ul style={{ fontSize: '13px', color: '#92400e', paddingLeft: '20px', margin: 0 }}>
                                    {uploadResponse.errors.map((err, i) => (
                                        <li key={i} style={{ marginBottom: '5px' }}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UploadStudents;
