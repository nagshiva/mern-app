import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing

// Styled components using @mui/system
const Root = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '50px',
});

const Form = styled('form')({
    width: '100%',
    marginTop: '1rem',
});

const SubmitButton = styled(Button)({
    marginTop: '1rem',
});

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill out all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Hash the password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const response = await fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password: hashedPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Signup successful!', data);
                console.log(`Username: ${username}, Email: ${email}, Password: ${hashedPassword}`);
                alert("Signup Successful");
                // Handle success: redirect or show message
            } else {
                console.error('Signup failed:', data);
                setError('Signup failed. Please try again.');
            }
            
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Error signing up. Please try again later.');
        }
    }

    return (
        <Root>
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            {error && (
                <Typography variant="body2" color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <Form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </SubmitButton>
                <Typography variant="body1" style={{ marginTop: '1rem' }}>
                    Already have an account? <Link to="/Login">Login</Link>
                </Typography>
            </Form>
        </Root>
    );
}

export default Signup;
