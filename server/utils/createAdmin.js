const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'info@globaltrend.co.in';
        const adminPassword = 'Global@55';
        
        // Check if admin already exists
        const existingUser = await User.findOne({ email: adminEmail });
        
        if (existingUser) {
            console.log(`User with email ${adminEmail} already exists.`);
            // Update role matching user request just in case
            existingUser.role = 'admin';
            await existingUser.save();
            console.log('Role ensured as admin.');
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // Create Admin
        const adminUser = await User.create({
            name: 'Global Trend Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            isVerified: true
        });

        if (adminUser) {
            console.log('Admin user created successfully!');
            console.log(`Email: ${adminEmail}`);
        } else {
            console.log('Failed to create admin user.');
        }

        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
