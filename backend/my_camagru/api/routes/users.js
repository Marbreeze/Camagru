const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User_model');
const { JWT_Secret } = require('../config');
/* GET users listing. */
//signin signout userlout 


// router.get('/hello', (req, res) => {
//   console.log('got it!');
//   return res.status(200).json({ message: 'got it' });
// });

//create the user token
const signToken = (usertoken) => {
  console.log('got something! ', usertoken); //pass in a var as an arg
  const token = JWT.sign({
    iss: 'back-endtoken',
    sub: usertoken._id, // it has to be the same as the arg
    iat: new Date().getTime(), //curent time 
    exp: new Date().setDate(new Date().getDate() + 1)//curent time + 1dayahead
  }, JWT_Secret);
  console.log(`${token}`);
  return token;
};


//sign up 
const signup = async (req, res) => {
  const { body } = req.value;
  const {
    firstName,
    lastName,
    password
  } = body;
  let { email } = req.value.body;

  console.log('got all variables');
  console.log({ firstName, lastName, email, password });
  if (!firstName) {
    console.error('No firstName');
    return res.json({
      succes: false,
      message: 'Error : First name can not be blank.'
    });
  }
  if (!lastName) {
    console.error('No lastName');
    return res.json({
      succes: false,
      message: 'Error : Last name can not be blank.'
    });
  }
  if (!email) {
    console.error('No email');
    return res.json({
      succes: false,
      message: 'Error : First name can not be blank.'
    });
  }
  if (!password) {
    console.error('No password');
    return res.json({
      succes: false,
      message: 'Error : First name can not be blank.'
    });
  }
  console.log({ email, type: typeof email });
  email = email.toLowerCase();
  console.log('Passed all manual checks!');

  //stepts in sign up  
  //**    verify if email doest exist     **/
  //**   save */

  const previousUser = await User.findOne({ email });
  console.log({ previousUser });
  if (previousUser) return res.json({ succes: false, message: "Error: Such email exists" });
  console.log('passed all insiders :D');
  //if there is error create newUser
  const newUser = new User({
    email, firstName, lastName
  });
  newUser.password = newUser.generateHash(password);
  console.log('new User = ', newUser);
  //const token = signToken(newUser);
  newUser.save().then((newUser) => {
 // console.log(`token = ${token}`);
 console.log('newUser');
    return res.json({ success: true});
  });
};

const login = async(req,res,next) =>{
  console.log('reached endpoint login with this', {params: req.body});
  console.log('trying to find such a user');
  const { email, password } = req.body;
  
  const leUser = await User.findOne({ email });
  console.log({leUser});

  if (!leUser) {
    // User with such email and password wasn't found
    console.log('No user');
    return res.json({
      succes: false,
      message: 'No user found.'
    });
  }


    // We found user.
    // We need to check his passwords (hash the one that you got from req.body and compare to the one in db. Use something like bcrypt.compare()
  if(bcrypt.compareSync(password, leUser.password)){
      console.log('usser and password great');
      const token = signToken(leUser);
      leUser.save().then((leUser) => {
        console.log(`token = ${token}`);
        res.json({ token: token });
      }
    )}
    else{
      res.json('false');
       res.json('Passwords did not match');
    }
    // If everything passed (passwords are the same) Generate jwt token and send it back to the user
    // On the front end when you recevie the results if success was true then proceed to the main app and consider your user logged in.
    // Also store the jwt token somewhere in localStorage : )
  };

const secret = async (req, res, next) => {
  //generate a key for token
  console.log('externalRoutes.secret() called');

};

module.exports = {
  signup,
  login,
  secret,
};
