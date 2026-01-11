const express = require('express');
const auth = require('C:\\Users\\aksha\\OneDrive\\Desktop\\devconnect\\devconnect\\config\\middleware\\auth.js');
const jwt = require('jsonwebtoken');
const User = require('../../config/models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');

const router = express.Router();

// @route   GET api/auth
// @desc    Test Route
// @access  Public

router.get('/', auth, async (req, res) => {try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);


} catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');


}});


router.post(
  '/',
  [
   
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').exists(),

  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 1️⃣ Check if user already exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Credentials' }],
        });
      }

      // 2️⃣ Create user instance
      

      // 3️⃣ Hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            errors: [{msg: 'Invalid Credentials'}]
        });
    

    }
    

      // 5️⃣ Create JWT payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // 6️⃣ Sign token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;


