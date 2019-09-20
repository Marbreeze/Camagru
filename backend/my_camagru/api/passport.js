const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const {JWT_Secret} = require('./config');
const User = require('./models/User_model');

passport.use(new JwtStrategy({   //midleware
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey:JWT_Secret 
}, async (payload, done) => {
    try{
        //find the user specified in token
        const user = await User.findById(payload.sub);
        //if user does't exist handle it
        if(!user){
            return done(null, false);
        }
        //if everything ok return 0 errors and users id
        done(null,user);
    }catch(err){
        done(err, false);
    }
})); 