import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, TextField, Button, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';

const initialAiTools = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/' },
    { name: 'DALL-E', url: 'https://www.openai.com/dall-e-2/' },
    { name: 'Google AI', url: 'https://ai.google/' },
    { name: 'IBM Watson', url: 'https://www.ibm.com/watson' },
    { name: 'Microsoft Azure AI', url: 'https://azure.microsoft.com/en-us/services/cognitive-services/' },
];

function AItools() {
    const [aiTools, setAiTools] = useState(initialAiTools);
    const [newToolName, setNewToolName] = useState('');
    const [newToolUrl, setNewToolUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLogos() {
            const updatedTools = await Promise.all(
                aiTools.map(async (tool) => {
                    try {
                        const response = await fetch(`https://logo.clearbit.com/${new URL(tool.url).hostname}`);
                        if (response.ok) {
                            const logoUrl = response.url;
                            return { ...tool, logo: logoUrl, favorite: false };
                        } else {
                            console.error('Failed to fetch logo for', tool.name);
                            return { ...tool, favorite: false };
                        }
                    } catch (error) {
                        console.error('Error fetching logo for', tool.name, error);
                        return { ...tool, favorite: false };
                    }
                })
            );
            setAiTools(updatedTools);
            setLoading(false);
        }

        fetchLogos();
    }, []); // Run once on component mount

    const handleAddTool = async () => {
        if (newToolName && newToolUrl) {
            try {
                const response = await fetch(`https://logo.clearbit.com/${new URL(newToolUrl).hostname}`);
                if (response.ok) {
                    const logoUrl = response.url;
                    const newTool = { name: newToolName, url: newToolUrl, logo: logoUrl, favorite: false };
                    setAiTools([...aiTools, newTool]);
                } else {
                    console.error('Failed to fetch logo for the new tool');
                    const newTool = { name: newToolName, url: newToolUrl, favorite: false };
                    setAiTools([...aiTools, newTool]);
                }
            } catch (error) {
                console.error('Error fetching logo for the new tool', error);
                const newTool = { name: newToolName, url: newToolUrl, favorite: false };
                setAiTools([...aiTools, newTool]);
            }
            setNewToolName('');
            setNewToolUrl('');
        }
    };

    const handleRemoveTool = (index) => {
        const updatedTools = [...aiTools];
        updatedTools.splice(index, 1);
        setAiTools(updatedTools);
    };

    const toggleFavorite = (index) => {
        const updatedTools = [...aiTools];
        updatedTools[index].favorite = !updatedTools[index].favorite;
        setAiTools(updatedTools);

        // Store favorite tools in localStorage
        const favoriteTools = updatedTools.filter(tool => tool.favorite);
        localStorage.setItem('favoriteTools', JSON.stringify(favoriteTools));
    };

    const logToolUsage = (tool) => {
        let history = JSON.parse(localStorage.getItem('toolHistory')) || [];
        history = [{ ...tool, usedAt: new Date().toISOString() }, ...history];
        if (history.length > 10) history.pop(); // Limit history to last 10 tools
        localStorage.setItem('toolHistory', JSON.stringify(history));
    };

    const handleToolClick = (tool) => {
        window.open(tool.url, '_blank');
        logToolUsage(tool);
    };

    const navigateToFavorites = () => {
        navigate('/favorite-tools'); // Corrected navigation path
    };

    const navigateToRecentlyUsed = () => {
        navigate('/recently-used'); // Navigate to the /recently-used route
    };

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
                AI Tools
            </Typography>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                {aiTools.map((tool, index) => (
                    <ListItem
                        key={tool.name}
                        sx={{
                            margin: '10px 0',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemAvatar
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleToolClick(tool)}
                        >
                            {loading ? (
                                <Typography>Loading...</Typography>
                            ) : (
                                <Avatar alt={tool.name} src={tool.logo} />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={tool.name}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleToolClick(tool)}
                        />
                        <IconButton
                            onClick={() => toggleFavorite(index)}
                            style={{ marginLeft: 'auto' }}
                            color={tool.favorite ? 'primary' : 'default'}
                        >
                            {tool.favorite ? <StarIcon /> : <StarBorderIcon />}
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent propagation to ListItem onClick
                                handleRemoveTool(index);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px',
                    width: '100%',
                    maxWidth: '600px',
                }}
            >
                <TextField
                    label="Tool Name"
                    value={newToolName}
                    onChange={(e) => setNewToolName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Tool URL"
                    value={newToolUrl}
                    onChange={(e) => setNewToolUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTool}
                    style={{ marginTop: '20px' }}
                >
                    Add Tool
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={navigateToFavorites}
                    style={{ marginTop: '20px' }}
                >
                    Go to Favorite Tools
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={navigateToRecentlyUsed}
                    style={{ marginTop: '20px' }}
                >
                    View Recently Used Tools
                </Button>
            </div>
        </div>
    );
}

export default AItools;
