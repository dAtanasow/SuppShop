const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {

                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `Invalid email format!`
        },
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [5, 'Username should be at least 5 characters'],
        trim: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9\s]+$/.test(value),
        },
        message: props => `${props.value} must contain only Latin letters and digits!`
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^0\d{9}$/.test(v);
            },
            message: props => `Invalid phone format!`
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password should be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/.test(v);
            },
            message: props => `${props.value} must contain only Latin letters and digits!`
        },
    },
    img: {
        type: String,
        default: "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"
    },
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            next();
        } catch (err) {
            console.error('Error hashing password:', err);
            next(err);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema);