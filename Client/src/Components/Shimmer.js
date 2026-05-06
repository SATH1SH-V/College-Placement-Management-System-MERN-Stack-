import React from 'react';

const Shimmer = ({ type = "block", height = "20px", width = "100%", style = {} }) => {
    const shimmerStyle = {
        background: '#f6f7f8',
        backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1000px 100%',
        display: 'inline-block',
        position: 'relative',
        animationPlaceholder: 'shimmer 1s linear infinite forwards',
        borderRadius: '4px',
        height: height,
        width: width,
        ...style
    };

    return (
        <>
            <style>
                {`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
        `}
            </style>
            <div style={{ ...shimmerStyle, animation: 'shimmer 1.5s infinite linear' }}></div>
        </>
    );
};

export const ShimmerCard = () => (
    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%' }}>
        <Shimmer height="30px" width="60%" style={{ marginBottom: '15px' }} />
        <Shimmer height="20px" width="40%" style={{ marginBottom: '10px' }} />
        <Shimmer height="15px" width="90%" style={{ marginBottom: '8px' }} />
        <Shimmer height="15px" width="80%" style={{ marginBottom: '20px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Shimmer height="35px" width="100px" style={{ borderRadius: '20px' }} />
            <Shimmer height="35px" width="120px" style={{ borderRadius: '20px' }} />
        </div>
    </div>
);

export const ShimmerTable = () => (
    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {[1, 2, 3, 4, 5].map(i => <Shimmer key={i} height="40px" width="100%" />)}
        </div>
        {[1, 2, 3, 4].map(row => (
            <div key={row} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                {[1, 2, 3, 4, 5].map(col => <Shimmer key={col} height="20px" width="100%" />)}
            </div>
        ))}
    </div>
);


export default Shimmer;
