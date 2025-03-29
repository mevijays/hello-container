const express = require('express');
const path = require('path');
const containerDetector = require('./utils/container-detector');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// API endpoint to get deployment information
app.get('/api/deployment-info', (req, res) => {
    try {
        const deploymentInfo = containerDetector.detectDeployment();
        res.json(deploymentInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to detect deployment environment' });
    }
});

// In your /api/detect-environment route handler
app.get('/api/detect-environment', (req, res) => {
    try {
        console.log('Detecting deployment environment (alias route)...');
        const deploymentInfo = containerDetector.detectDeployment();
        console.log('Deployment info:', deploymentInfo);
        res.json(deploymentInfo);
    } catch (error) {
        console.error('Error detecting deployment:', error);
        res.status(500).json({ error: 'Failed to detect deployment environment' });
    }
});

// Add this debugging route
app.get('/debug', (req, res) => {
    res.send(`
        <html>
        <head><title>Debug</title></head>
        <body>
            <h1>Debug Info</h1>
            <pre>${JSON.stringify(containerDetector.detectDeployment(), null, 2)}</pre>
            <h2>Environment Variables</h2>
            <pre>${JSON.stringify(process.env, null, 2)}</pre>
            <h2>Files in public directory</h2>
            <pre>${JSON.stringify(fs.readdirSync(path.join(__dirname, 'public')), null, 2)}</pre>
        </body>
        </html>
    `);
});

// Only start the server if this file is run directly (not imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Export the app for testing
module.exports = app;