const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   GET api/auth
// @desc   get logged in
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log(user)
        res.json({user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc   Auth user get token
// @access   Public
router.post(
    '/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is more than 6 digit').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credential' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credential' });
            }
            if (isMatch) {
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
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
