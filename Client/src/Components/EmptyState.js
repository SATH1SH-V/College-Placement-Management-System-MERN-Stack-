import { FaInbox, FaBuilding, FaCalendarAlt, FaUserGraduate } from 'react-icons/fa';

function EmptyState({ type = 'default', message, action }) {
    const icons = {
        companies: <FaBuilding size={48} />,
        drives: <FaCalendarAlt size={48} />,
        students: <FaUserGraduate size={48} />,
        default: <FaInbox size={48} />
    };

    const messages = {
        companies: 'No companies added yet',
        drives: 'No drives scheduled yet',
        students: 'No students placed yet',
        default: 'No data available'
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            maxWidth: '400px',
            margin: '40px auto'
        }}>
            <div style={{ color: '#9ca3af', marginBottom: '16px' }}>
                {icons[type]}
            </div>
            <h3 style={{ fontSize: '20px', color: '#374151', marginBottom: '8px' }}>
                {message || messages[type]}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
                {type === 'companies' && 'Start by adding partner companies to your portal'}
                {type === 'drives' && 'Schedule placement drives when companies visit'}
                {type === 'students' && 'Students will appear here once they get placed'}
                {type === 'default' && 'Get started by adding some data'}
            </p>
            {action && action}
        </div>
    );
}

export default EmptyState;
