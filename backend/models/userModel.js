// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs'
// import crypto from 'crypto'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
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
// export default User
module.exports = User