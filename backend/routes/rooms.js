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
                type: roomType,
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
            bookedByName,
            academicLevel,
            program,
            phone,
            nationality,
            gender,
            guardianName,
            relationship,
            guardianPhone,
        } = req.body;

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
            bookedByName,
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

// Cancel a booking
router.post('/cancel', async (req, res) => {
    try {
        const { roomId, hostel } = req.body;

        // Validate request body
        if (!roomId || !hostel) {
            return res.status(400).json({ error: 'Room ID and hostel are required' });
        }

        // Find the room
        const room = await Room.findOne({
            where: {
                roomId,
                hostel,
            },
        });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        if (!room.booked) {
            return res.status(400).json({ error: 'Room is not currently booked' });
        }

        // Clear the booking details and mark the room as available
        await room.update({
            booked: false,
            bookedByName: null,
            bookedByEmail: null,
            academicLevel: null,
            program: null,
            phone: null,
            nationality: null,
            gender: null,
            guardianName: null,
            relationship: null,
            guardianPhone: null,
        });

        res.json({ message: 'Booking canceled successfully' });
    } catch (err) {
        console.error('Error canceling booking:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;