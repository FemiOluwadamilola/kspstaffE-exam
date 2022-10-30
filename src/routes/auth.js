const express = require('express');
const User = require('../models/User');
const Cryptojs = require('crypto-js');
const passport = require('passport');
const {ensureAuthenticated,alreadyAuthenticated} = require('../middleware/verifyAuth');
const router = express.Router();

router.post('/reg', async (req,res) => {
 const {staffId,firstname,lastname,email,department,password} = req.body;
 try{
   const user = new User({
   	 staffId,
   	 firstname,
   	 lastname,
   	 email,
   	 department,
   	 password:Cryptojs.AES.encrypt(req.body.password,process.env.CRYPTO_SECRET_KEY).toString(),
   });
   const newUser = await user.save();
   res.status(200).redirect('/login')
 }catch(err){
 	res.status(500).send(err.message);
 }
})


// google authentication router
// router.get('/google', passport.authenticate('google', 
//   {
//     scope:['profile']
//   } 
//   )
// )

// google auth failure redirect
// router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/'}), (req,res) => {
//    res.redirect('/cbt')
// })

// local signin authentication router
router.post('/login', alreadyAuthenticated, (req,res,next) => {
   passport.authenticate('local',{
    successRedirect:'/cbt',
    failureRedirect:'/',
    failureFlash:true
  })(req,res,next);
})


module.exports = router;