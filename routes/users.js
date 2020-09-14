const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const User = require('../models/User');


// @route   GET api/shop
// @desc   get all user shop
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.find({ }).sort({
            date: -1,
        });
        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users
// @desc   Register user
// @access   Public
router.post(
    '/',
    [
        check('firstname', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is more than 6 digit').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exist' });
            }
            user = new User(req.body);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: { id: user.id }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route   PUT api/user/:id
// @desc   update user
// @access   Private
router.put('/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/user/:id
// @desc   delete user
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
