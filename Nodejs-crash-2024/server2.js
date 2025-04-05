import dotenv from "dotenv";
import { createServer} from 'http';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;  // Default to 3000 if PORT is not set

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Jim Doe' },
    { id: 4, name: 'Jack Doe' },
    { id: 5, name: 'Jill Doe' },
];

//Creating the logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Now this is done, let us move onto the next middleware
};

//Creating the JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next(); // Now this is done, let us move onto the next middleware
};

//Route Handler for GET /api/users
const getUsers = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
};

//Route Handler for GET /api/users/:id
const getUserById = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
};

//Route Handler for POST /api/users
const createUserHandler = (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString(); // Convert Buffer to string
    });

    req.on ('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

//Not Found Handler
const notFound = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
};

const server = createServer((req, res) => {

    //Call the logger middleware
    logger (req, res, () => {
        jsonMiddleware (req, res, () => {
            if (req.method === 'GET' && req.url === '/api/users') {
                getUsers(req, res);
            } else if (req.url.match(/\api\/users\/([0-9]+)/) && req.method === 'GET') {
                getUserById(req, res);
            } else if (req.method === 'POST' && req.url === '/api/users') {
                createUserHandler(req, res);
            } else {
                notFound(req, res);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});