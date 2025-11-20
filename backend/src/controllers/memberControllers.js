const bcryptor = require('../utils/bcryptor');
const Member = require('../models/Member');
const jwt = require('jsonwebtoken');

async function createMember(req, res) {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExist = await Member.findOne({email: email});
        if(userExist) {
            return res.status(409).json({ message: 'Member already exist.' });
        }

        const hashedPassword = await bcryptor.hashPassword(password);
        await Member.create({name: name, email: email, password_hash: hashedPassword});

        res.status(201).json({ message: 'Member registration successful!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function loginMember(req, res) {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExist = await Member.findOne({email: email});
        if(!userExist) {
            return res.status(401).json({ message: 'User does not exist!' });
        }

        const correctPassword = await bcryptor.verifyPassword(password, userExist.password_hash);
        if (!correctPassword) {
            return res.status(401).json({ message: 'Wrong password!' });
        }

        const token = jwt.sign(
            { memberId: userExist._id, memberName: userExist.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createMember, loginMember };