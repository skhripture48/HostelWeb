const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Room = sequelize.define('Room', {
        hostel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['wagyingo-main', 'wagyingo-onyx', 'wagyingo-opal']],
            },
        },
        roomId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['single', 'double', 'triple', 'quad']],
            },
        },
        booked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        bookedByName: {
            type: DataTypes.STRING,
        },
        bookedByEmail: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        academicLevel: {
            type: DataTypes.STRING,
        },
        program: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        nationality: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
        },
        guardianName: {
            type: DataTypes.STRING,
        },
        relationship: {
            type: DataTypes.STRING,
        },
        guardianPhone: {
            type: DataTypes.STRING,
        },
    });

    return Room;
};