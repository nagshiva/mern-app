import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function RecentlyUsed() {
    const [recentlyUsedTools, setRecentlyUsedTools] = useState([]);

    useEffect(() => {
        // Fetch recently used tools from localStorage
        const storedRecentlyUsedTools = JSON.parse(localStorage.getItem('toolHistory')) || [];
        setRecentlyUsedTools(storedRecentlyUsedTools);
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
                Recently Used Tools
            </Typography>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                {recentlyUsedTools.map((tool, index) => (
                    <ListItem
                        key={index}
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
                        <ListItemText primary={tool.name} secondary={`Used on: ${new Date(tool.usedAt).toLocaleString()}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default RecentlyUsed;
