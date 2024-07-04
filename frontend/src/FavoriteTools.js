import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function FavoriteTools() {
    const [favoriteTools, setFavoriteTools] = useState([]);

    useEffect(() => {
        // Fetch favorite tools from localStorage
        const storedFavoriteTools = JSON.parse(localStorage.getItem('favoriteTools')) || [];
        setFavoriteTools(storedFavoriteTools);
    }, []);

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
                Favorite Tools
            </Typography>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                {favoriteTools.map((tool) => (
                    <ListItem
                        key={tool.name}
                        sx={{
                            margin: '10px 0',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '10px',
                            '&:hover': {
                                backgroundColor: '#f1f1f1',
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => window.open(tool.url, '_blank')}
                    >
                        <ListItemText primary={tool.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default FavoriteTools;
