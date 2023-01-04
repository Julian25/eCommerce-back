const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'is required']
    },

    email: {
        type: String,
        required: [true, 'is required'],
        unique: true,
        index: true,
        validate: {
            validator: function(str){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str)
            },
            message: props => `${props.value} is not a valid message`
        }
    },

    password: {
        type: String,
        required: [true, 'is required']
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    cart: {
        type: Object,
        default: {
            total: 0,
            count: 0
        }
    },

    notification: {
        type: Array,
        default: []
    },

    order: {
        type: Schema.Types.ObjectId, 
        ref: 'Order'
    }
}, {minimize: false});

const  User = mongoose.model('User', userSchema);
module.exports = User;
