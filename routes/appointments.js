const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// @route   GET api/appointment
// @desc   get all user appointment
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const appointment = await Appointment.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json({ appointment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/appointment
// @desc   Add new appointment
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('appointmentDate', 'Appointment Date is required').not().isEmpty()
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { appointmentDate } = req.body;
        try {
            const newAppointment = new Appointment({
                appointmentDate,
                user: req.user.id,
            });
            const appointment = await newAppointment.save();
            res.json({ appointment });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/appointment/:id
// @desc   get appointment
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.json({ appointment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/appointment/:id
// @desc   update appointment
// @access   Private
router.put('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body);
        res.json({ appointment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/appointment/:id
// @desc   delete appointment
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndRemove(req.params.id);
        res.json({ appointment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
