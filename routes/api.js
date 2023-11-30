const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Equipment = require('../models/Equipment');
const Scheme = require('../models/Scheme');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    userType: req.body.userType
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            userType: user.userType
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// Add Equipment
router.post('/equipment', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newEquipment = new Equipment({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    owner: req.user._id
  });

  Equipment.addEquipment(newEquipment, (err, equipment) => {
    if(err){
      res.json({success: false, msg:'Failed to add equipment'});
    } else {
      res.json({success: true, msg:'Equipment added'});
    }
  });
});

// Get All Equipment
router.get('/equipment', (req, res, next) => {
  Equipment.find({}, (err, equipment) => {
    if(err){
      res.json({success: false, msg:'Failed to get equipment'});
    } else {
      res.json({success: true, equipment: equipment});
    }
  });
});

// Get Schemes by State
router.get('/schemes/:state', (req, res, next) => {
  Scheme.find({state: req.params.state}, (err, schemes) => {
    if(err){
      res.json({success: false, msg:'Failed to get schemes'});
    } else {
      res.json({success: true, schemes: schemes});
    }
  });
});

module.exports = router;
