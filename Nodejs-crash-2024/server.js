import http from "http";
import dotenv from "dotenv";
import fs from 'fs/promises';
import url from "url";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

//Get current path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, "\n", __dirname);

const PORT = process.env.PORT || 3000;  // Default to 3000 if PORT is not set

// Create an HTTP server
const server = http.createServer(async (req, res) => {
    try {
    // Check if GET request
    if (req.method === 'GET') {
        let filePath;
        if (req.url === '/') {
          filePath = path.join(__dirname, 'public', 'index.html');
        } else if (req.url === '/about') {
          filePath = path.join(__dirname, 'public', 'about.html');
        } else {
          throw new Error('Not Found');
        }
  
        const data = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        res.end();
    } else {
        throw new Error('Method not allowed');
    }

    } catch (error) { 
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT}`);
});
