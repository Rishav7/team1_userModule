// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs'
// import crypto from 'crypto'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const userSchema = mongoose.Schema({

    name: {
        type: String,
        unique: false,
        lowercase: true,
        trim: true,
        required: [true, 'Please provide a Name'],
        match: [/[a-zA-Z]{4,}/, 'Please provide a valid Name'],
        index: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please provide a Email'],
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'Please provide a valid Email Address'],
        index: true
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a Password'],
        match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    phone: {
        type: Number,
        max: 9999999999,
        min: 1000000000,
        unique: true,
        required: [true, 'Please provide a Contact Number']
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
    passwordResetToken: String,
    passwordResetExpires: Date
},
    {
        timestamps: true
    })

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        next()
    }
    this.timestamps = true;
    next();

})
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log({ resetToken }, this.passwordResetToken)
    return resetToken;
}


const User = mongoose.model('User', userSchema)
module.exports = User
