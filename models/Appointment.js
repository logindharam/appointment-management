const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    appointmentDate: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('appointment', AppointmentSchema);
