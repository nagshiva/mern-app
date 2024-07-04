import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

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

function Login() {
    const [identifier, setIdentifier] = useState(''); // Can be username or email
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!identifier || !password) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                identifier,
                password
            });

            console.log(response.data); // Replace with your logic to handle response

            if (response.status === 200) {
                // Redirect or perform other actions (e.g., store tokens)
                console.log('Login successful!');
                // Redirect to another page, for example:
                // window.location.href = '/dashboard';
            } else {
                setError(response.data.error || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in. Please try again later.');
        }
    };

    return (
        <Root>
            <Typography variant="h4" gutterBottom>
                Login
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
                    id="identifier"
                    label="Username or Email"
                    name="identifier"
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPasswordToggle}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Login
                </SubmitButton>
                <Typography variant="body1" style={{ marginTop: '1rem' }}>
                    Don't have an account? <Link to="/Signup">Sign Up</Link>
                </Typography>
            </Form>
        </Root>
    );
}

export default Login;
