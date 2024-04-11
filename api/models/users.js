const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
    },
    avatar:{
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    addresses: [
        {
            name: {
                type: String,
                require: true
            },
            houseNo: {
                type: String,
                require: true,
            },
            mobileNo: {
                type: String,
                require: true,
            },
            city: {
                type: String,
                require: true,
            },
            type: {
                type: String,
                require: true,
            }
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User