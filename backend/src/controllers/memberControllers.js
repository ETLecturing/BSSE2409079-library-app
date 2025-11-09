const bcryptor = require('../utils/bcryptor');
const Member = require('../models/Member');

async function createMember(req, res) {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const userExist = await Member.findOne({email: email});

        if(!userExist) {
            const newMember = await Member.create({
                name: name,
                email: email,
                password_hash: await bcryptor.hashPassword(password)
            });

            await newMember.save();
            console.log('New Member created and saved:', newMember);

        } else {
            console.log('User already exist!');
            console.log(userExist);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createMember };