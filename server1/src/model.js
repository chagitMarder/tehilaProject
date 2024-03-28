const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,

        validate: {
            validator: function (v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },

    address: {
        city: {
            type: String,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        houseNumber: {
            type: String,
            required: false
        }
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    celolarPhoneNumber: {
        type: String,
        required: false
    },

    vaccineDate: {
        // type: [Date],
        // required: false
        vArray: [
            {
                vDate: { type: Date },
                vManufacturer: { type: String }
            }
        ]
    },

    sickDate: {
        type: Date,
        required: false
    },
    recoveryDate: {
        type: Date,
        required: false
    },
  
});

const User = mongoose.model("User", userSchema);
module.exports.User = User;
