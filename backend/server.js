const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const roomRoutes = require('./routes/rooms');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MySQL using Sequelize
db.sequelize.authenticate()
    .then(() => console.log('Connected to MySQL'))
    .catch((err) => console.error('MySQL connection error:', err));

// Sync models with the database (creates tables if they don't exist)
db.sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database:', err));

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Hostel Booking Backend is Running');
});

// Update a booking (using the Room model)
app.put('/api/bookings/update', async (req, res) => {
    const { hostel, roomId, fullName, academicLevel, program, phone, nationality, gender, guardianName, relationship, guardianPhone } = req.body;

    try {
        // Find the room by hostel and roomId
        const room = await db.Room.findOne({
            where: {
                hostel: hostel,
                roomId: roomId,
            },
        });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (!room.booked) {
            return res.status(400).json({ message: 'Room is not booked' });
        }

        // Update the room with new booking details
        await room.update({
            bookedByName: fullName,
            academicLevel,
            program,
            phone,
            nationality,
            gender,
            guardianName,
            relationship,
            guardianPhone,
        });

        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Use routes
app.use('/api/rooms', roomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});