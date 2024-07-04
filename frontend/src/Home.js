// frontend/src/Home.js
import React from 'react';
import { Typography, Container } from '@mui/material';

function Home() {
    return (
        <Container style={{ marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to FuseAI
            </Typography>
            <Typography variant="body1">
                This is the home page. Here you can find information about our AI tools and services.
            </Typography>
        </Container>
    );
}

export default Home;
