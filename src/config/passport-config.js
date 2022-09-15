const LocalStrategy = require('passport-local').Strategy;
const Cryptojs = require('crypto-js');
const User = require('../models/User');

const staffAuthentication = async (staffId,password,done) =>{
 try{
 	const staff = await User.findOne({staffId});
 	if(!staff){
 	   return done(null,false,{message:"Staff Id not valid"})
 	}
 	const hashedPassword = Cryptojs.AES.decrypt(staff.password, process.env.CRYPTO_SECRET_KEY);
    const decryptedPassword = hashedPassword.toString(Cryptojs.enc.Utf8);

    if(decryptedPassword !== password){
      	return done(null,false,{message:'password incorrect'})
      }else{
      	return done(null,staff)
      }
 }catch(err){
   console.log(err.message)
 }
}

const passportInit = (passport) => {
	passport.use(new LocalStrategy({usernameField:'staffId'}, staffAuthentication))

	passport.serializeUser((staff,done) => {
		done(null, staff.id)
	})

	passport.deserializeUser((id,done) => {
		User.findById(id,(err,staff) => {
			done(err,staff);
		})
	})
}

module.exports = passportInit;