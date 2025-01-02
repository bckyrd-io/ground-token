// server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Playground, User, Payment } from './schema'; // Import schema models
import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';


// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/db_ground_token');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Database');

    // Seed Sample Data
    const seedData = async () => {
        try {
            const playgroundExists = await Playground.exists({ name: 'City Park Playground' });
            if (!playgroundExists) {
                await Playground.create({
                    name: 'trampoline',
                    description: 'A great place for kids to play and enjoy.',
                    location: { latitude: '40.748817', longitude: '-73.985428' },
                    image: '/uploads/sample-playground.jpg', // Replace with your image path
                    bookingPrice: 10.0, // Added booking price
                    status: 'Available', // Added status
                });

                console.log('Sample Playground seeded successfully');
            }

            const userExists = await User.exists({ email: 'john@example.com' });
            if (!userExists) {
                await User.create({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: '1234',
                });
                console.log('Sample User seeded successfully');
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error('Failed to seed data:', err.message);
            } else {
                console.error('Failed to seed data:', err);
            }
        }
    };
    seedData();
});

// Playground Routes
app.get('/api/playgrounds', async (req, res) => {
    try {
        const playgrounds = await Playground.find();
        res.json(playgrounds);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});





// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store images in 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Handle playground creation with image upload
app.post('/api/playgrounds', upload.single('image'), async (req, res) => {
    try {
        const { name, description, latitude, longitude } = req.body;

        const newPlayground = await Playground.create({
            name,
            description,
            location: { latitude, longitude },
            image: req.file ? `/uploads/${req.file.filename}` : undefined, // Save image path
        });

        res.status(201).json(newPlayground);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.put('/api/playgrounds/:id', async (req, res) => {
    try {
        const updatedPlayground = await Playground.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPlayground);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
});

app.delete('/api/playgrounds/:id', async (req, res) => {
    try {
        await Playground.findByIdAndDelete(req.params.id);
        res.json({ message: 'Playground deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
});

app.get('/api/playgrounds/:id', async (req, res) => {
    try {
        const playground = await Playground.findById(req.params.id);
        if (!playground) {
            res.status(404).json({ error: 'Playground not found' });
            return;
        }
        res.json(playground);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
);






// User Routes
app.post('/api/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

// Payment Routes


app.post('/api/payments/book/:id', async (req, res) => {
    try {
        const { method, amount, status } = req.body;

        // Validate playground ID
        const playground = await Playground.findById(req.params.id);
        if (!playground) {
            res.status(404).json({ error: 'Playground not found' });
            return; // Ensure the function ends here
        }

        // Create payment record
        const newPayment = await Payment.create({
            method,
            amount,
            status: status || 'Pending',
        });

        // Update playground status
        playground.status = 'Occupied';
        await playground.save();

        res.status(201).json({ payment: newPayment, playground });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
});




app.put('/api/payments/:paymentId/complete', async (req: Request<{ paymentId: string }>, res: Response) => {
    try {
        const { paymentId } = req.params;

        // Find the payment by ID
        const payment = await Payment.findById(paymentId);

        // Ensure the payment is found
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // If payment is found, update the status to 'Paid'
        payment.status = 'Paid';
        await payment.save();

        // Return the updated payment object
        res.json({ message: 'Payment completed successfully', payment });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
