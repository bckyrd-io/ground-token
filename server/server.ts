// server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample Data
let playgrounds = [
  {
    id: '1',
    name: 'City Park Playground',
    description: 'A great place for kids to play and enjoy.',
    location: { latitude: '40.748817', longitude: '-73.985428' },
    activities: [
      {
        id: 'a1',
        name: 'Trampoline',
        description: 'Jumping fun!',
        status: 'Available',
        queue: 5,
        price: 2.5,
        maxTimeAllowed: 60,
      },
    ],
  },
  {
    id: '2',
    name: 'Lakeside Playground',
    description: 'Perfect for families with scenic lake views.',
    location: { latitude: '34.052235', longitude: '-118.243683' },
    activities: [],
  },
];

let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: '1234', status: 'Active', pendingPayment: true },
];

let payments = [];

// Playground Routes
app.get('/api/playgrounds', (req, res) => {
  res.json(playgrounds);
});

app.post('/api/playgrounds', (req, res) => {
  const newPlayground = { id: Date.now().toString(), ...req.body };
  playgrounds.push(newPlayground);
  res.status(201).json(newPlayground);
});

app.put('/api/playgrounds/:id', (req, res) => {
  const { id } = req.params;
  const index = playgrounds.findIndex((p) => p.id === id);
  if (index !== -1) {
    playgrounds[index] = { ...playgrounds[index], ...req.body };
    res.json(playgrounds[index]);
  } else {
    res.status(404).json({ error: 'Playground not found' });
  }
});

app.delete('/api/playgrounds/:id', (req, res) => {
  const { id } = req.params;
  playgrounds = playgrounds.filter((p) => p.id !== id);
  res.json({ message: 'Playground deleted successfully' });
});

// User Routes
app.post('/api/register', (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Payment Routes
app.post('/api/payments', (req, res) => {
  const newPayment = { id: Date.now().toString(), ...req.body, timestamp: new Date() };
  payments.push(newPayment);
  res.status(201).json(newPayment);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
