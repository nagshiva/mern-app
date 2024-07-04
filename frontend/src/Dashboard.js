// frontend/src/Dashboard.js
import React from 'react';
import { Typography } from '@mui/material';

function Dashboard() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                marginTop: '50px',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            {/* Add any other content specific to the dashboard here */}
        </div>
    );
}

export default Dashboard;
