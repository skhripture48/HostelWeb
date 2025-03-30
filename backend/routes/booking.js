const express = require('express');
const router = express.Router();
const { Room } = require('../models');

// Update booking details
router.put('/update', async (req, res) => {
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

        // Validate request body
        if (!roomId || !hostel || !bookedByName || !academicLevel || !program || !phone || !nationality || !gender || !guardianName || !relationship || !guardianPhone) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find the room
        const room = await Room.findOne({
            where: {
                roomId,
                hostel,
                booked: true, // Ensure the room is booked
            },
        });

        if (!room) {
            return res.status(400).json({ error: 'Room is not booked or does not exist' });
        }

        // Update the room with new booking details
        await room.update({
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

        res.json({ message: 'Booking updated successfully' });
    } catch (err) {
        console.error('Error updating booking:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;