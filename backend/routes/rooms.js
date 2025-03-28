const express = require('express');
const router = express.Router();
const { Room } = require('../models');

// Get available rooms for a specific hostel and room type
router.get('/available', async (req, res) => {
    try {
        const { hostel, roomType } = req.query;
        if (!hostel || !roomType) {
            return res.status(400).json({ error: 'Hostel and room type are required' });
        }

        const rooms = await Room.findAll({
            where: {
                hostel,
                roomType,
                booked: false,
            },
        });

        res.json(rooms);
    } catch (err) {
        console.error('Error fetching available rooms:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Book a room
router.post('/book', async (req, res) => {
    try {
        const {
            roomId,
            hostel,
            bookedByName, // Changed from fullName to bookedByName
            academicLevel,
            program,
            phone,
            nationality,
            gender,
            guardianName,
            relationship,
            guardianPhone,
        } = req.body;

        // Updated validation to check for bookedByName instead of fullName
        if (!roomId || !hostel || !bookedByName || !academicLevel || !program || !phone || !nationality || !gender || !guardianName || !relationship || !guardianPhone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const room = await Room.findOne({
            where: {
                roomId,
                hostel,
                booked: false,
            },
        });

        if (!room) {
            return res.status(400).json({ error: 'Room is not available or does not exist' });
        }

        // Update the room with booking details
        await room.update({
            booked: true,
            bookedByName, // This field already matches the Room model
            academicLevel,
            program,
            phone,
            nationality,
            gender,
            guardianName,
            relationship,
            guardianPhone,
        });

        res.json({ message: 'Room booked successfully' });
    } catch (err) {
        console.error('Error booking room:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;