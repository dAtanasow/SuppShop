const userModel = require('../models/userModel');
const tokenBlacklistModel = require('../models/tokenBlacklistModel');

const { verifyToken, createToken } = require('../utils/jwt');


const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData;
}

async function register(req, res, next) {
    const { email, username, phone, password, rePass } = req.body;

    if (password !== rePass) {
        return res.status(400).send({ message: 'Passwords do not match!' });
    }

    try {
        const existingUserByEmail = await userModel.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).send({ message: 'Email is already registered!' });
        }

        const existingUserByUsername = await userModel.findOne({ username });
        if (existingUserByUsername) {
            return res.status(409).send({ message: 'Username is already taken!' });
        }

        const createdUser = await userModel.create({ email, username, phone, password });

        let cleanUser = bsonToJson(createdUser);
        cleanUser = removePassword(cleanUser);

        const token = createToken({ _id: createdUser._id });
        if (!token) {
            console.log('Error: No token generated');
            return res.status(500).send({ message: 'Internal server error' });
        }

        res.status(201).send({
            user: cleanUser,
            accessToken: token,
            message: 'Registration successful',
        });

    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            let field = err.message.split("index: ")[1];
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_"));
            res.status(409).send({ message: `This ${field} is already registered!` });
            return;
        }

        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found. Please check your email.' });
        }

        const match = await user.matchPassword(password);

        if (!match) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        let cleanUser = bsonToJson(user);
        cleanUser = removePassword(cleanUser);

        const token = createToken({ _id: cleanUser._id });

        if (!token) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.setHeader('Authorization', `Bearer ${token}`);

        res.status(200).send({
            user: cleanUser,
            accessToken: token,
            message: 'Login successful',
        });

    } catch (error) {
        next(error);
    }
}

async function logout(req, res) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).send({ message: 'Authorization token is required' });
        }

        try {
            const decoded = await verifyToken(token);

            const blacklistedToken = await tokenBlacklistModel.findOne({ token });
            if (blacklistedToken) {
                return res.status(400).send({ message: 'Token already blacklisted' });
            }

            await tokenBlacklistModel.create({ token });

            res.clearCookie('token');

            return res.status(200).send({ message: 'Logged out successfully!' });

        } catch (err) {
            console.error('Token verification failed:', err);
            return res.status(401).send({ message: 'Invalid or expired token' });
        }
    } catch (err) {
        console.error('Logout failed:', err);
        res.status(500).send({ message: 'Something went wrong during logout' });
    }
}

async function checkAvailable(req, res) {
    let { email, username, phone, userId } = req.query;

    try {
        let user = null;
        if (userId && userId !== "null") {
            user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        let emailTaken = false;
        let usernameTaken = false;
        let phoneTaken = false;

        if (email) {
            emailTaken = !!(await userModel.findOne({ email, _id: { $ne: userId } }));
        }
        if (username) {
            usernameTaken = !!(await userModel.findOne({ username, _id: { $ne: userId } }));
        }
        if (phone) {
            phoneTaken = !!(await userModel.findOne({ phone, _id: { $ne: userId } }));
        }

        res.json({ emailTaken, usernameTaken, phoneTaken });

    } catch (error) {
        console.error("Error checking availability:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}




function getUserById(req, res, next) {
    const { userId } = req.params;

    userModel.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'userModel not found' });
            }
            res.status(200).json(user);
        })
        .catch((err) => next(err));
}


const editProfileInfo = async (req, res) => {
    try {
        const { username, email, phone, img } = req.body;
        const userId = req.user._id;

        const currentUser = await userModel.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newEmail = email.trim().toLowerCase();
        const newUsername = username.trim();
        const newPhone = phone.trim();

        const currentEmail = currentUser.email ? currentUser.email.trim().toLowerCase() : "";
        const currentUsername = currentUser.username ? currentUser.username.trim() : "";
        const currentPhone = currentUser.phone ? currentUser.phone.trim() : "";

        const emailChanged = newEmail !== currentEmail;
        const usernameChanged = newUsername !== currentUsername;
        const phoneChanged = newPhone !== currentPhone;

        if (emailChanged) {
            const emailTaken = await userModel.findOne({ email: newEmail, _id: { $ne: userId } });
            console.log("Email check:", emailTaken);
            if (emailTaken) return res.status(400).json({ message: "Email is already taken." });
        }

        if (usernameChanged) {
            const usernameTaken = await userModel.findOne({ username: newUsername, _id: { $ne: userId } });
            console.log("Username check:", usernameTaken);
            if (usernameTaken) return res.status(400).json({ message: "Username is already taken." });
        }

        if (phoneChanged) {
            const phoneTaken = await userModel.findOne({ phone: newPhone, _id: { $ne: userId } });
            console.log("Phone check:", phoneTaken);
            if (phoneTaken) return res.status(400).json({ message: "Phone number is already taken." });
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            username: newUsername,
            email: newEmail,
            phone: newPhone,
            img
        }, { new: true });

        console.log("Updated user:", updatedUser);

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login,
    register,
    logout,
    getUserById,
    editProfileInfo,
    checkAvailable,
};