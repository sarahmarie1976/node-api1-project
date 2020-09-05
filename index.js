const express = require('express'); 
const shortid = require('shortid');
const cors = require('cors');


// Creating a server calling express and will give back a server instance
const server = express();

// adding middleware  -- don't forget to invoke it as a function
// teaches express how to read JSON from the body
server.use(express.json()); 
server.use(cors());


let users =[
    {
        id: shortid.generate(),
        name: 'Jane Doe',
        bio: "Not Tarzan's wife, another Jane"
    },
    {
        id: shortid.generate(),
        name: 'Debra Carroll',
        bio: "Knows that successful students become successful adults"
    }
]

server.get('/', (req, res) => {
    res.send('<h1>Users for Lambda</h1>')
});


// When the client makes a GET request to /api/users:
server.get('/api/users', (req, res) => {
    // const found = users.find(h => h.id === id);

    if (1 == 1) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
});


// When the client makes a GET request to /api/users/:id:
server.get('/api/users/:id', (req, res) => {
    // res.status(200).json(users);
    const { id } = req.params;
    let found = users.find(user => user.id === id);

    if (found) {
        // users = users.filter(user => user.id !== id);
        try {
            res.status(200).json(found);
        } catch (error) {
            res.status(500).json({ errorMessage: "The user information could not be modified." })
        }
    } else {
        res.status(404).json({message: "user not found"});
    }
});


// When the client makes a POST request to /api/users:
server.post('/api/users', (req, res) => {
    const newUser = req.body; // needs express.json() middleware
    const name = newUser.name;
    const bio = newUser.bio;
    
    if(name && bio) {
        newUser.id = shortid.generate();
        users.push(newUser)
        res.status(201).json(newUser)
    } else if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
});

// When the client makes a PUT request to /api/users/:id:
server.put('/api/users/:id', (req, res) => {
    
    const id = req.params.id;
    const changes = req.body;
    const name = changes.name;
    const bio = changes.bio;
    
    let found = users.find(h => h.id === id);
    
    if(found) {
          // found an id match 
          // now check that name and bio are correct
        if (name && bio) { 
            // since name AND bio both exist, make the update
            try {
                Object.assign(found, changes);
                res.status(200).json(found);
            } catch (error) {
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }   
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
});


// When the client makes a DELETE request to /api/users/:id:
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const found = users.find(h => h.id === id);

    if (!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (found) {
        users = users.filter(h => h.id !== id);
        res.status(200).json(found);
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
});







// Defining PORT
const PORT = 7000;  // we visit localhost (http://localhost:8000/) to see the api

// To run the server we want to listening to server
server.listen(PORT, ()  => console.log(`server running on port ${PORT}`))



// console.log('server running....');