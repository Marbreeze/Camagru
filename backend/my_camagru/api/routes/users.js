const JWT = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
//const bcrypt = require('bcrypt');
const User = require('../models/User_model')
/* GET users listing. */
//signin signout userlout 


router.get('/hello', (req, res) => {
  console.log('got it!');
  return res.status(200).json({message: 'got it'});
})
 signToken = (usertoken) => {
    return JWT.sign({
        iss:'back-endtoken',
        sub:usertoken._id,
        iat: new Date().getTime(), //curent time 
        exp:new Date().setDate(new Date().getDate() + 1)//curent time + 1dayahead
      }, 'secret')
      //console.log(`${token}`);
      //return res.json({success: true, token});
    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
//sign up 

router.post('/signup', async (req,res) => {
  const {body} = req;
  const {
    firstName,
    lastName,
    password
  } = body;
  let {email} = body;

  console.log('got all variables');
  console.log({firstName, lastName, email, password});
  if(!firstName){
    console.error('No firstName');
    return res.json({
      succes:false,
      message:'Error : First name can not be blank.'
    });
  }
  if(!lastName){
    console.error('No lastName');
    return res.json({
      succes:false,
      message:'Error : Last name can not be blank.'
    });
  }
  if(!email){
    console.error('No email');
    return res.json({
      succes:false,
      message:'Error : First name can not be blank.'
    });
  }
  if(!password){
    console.error('No password');
    return res.json({
      succes:false,
      message:'Error : First name can not be blank.'
    });
  }
  console.log({email, type: typeof email});
  email = email.toLowerCase();
  console.log('Passed all manual checks!');


  //stepts in sign up  
  //**    verify if email doest exist     **/
  //**   save */

  try{
    const previousUser = await User.findOne({email});
    if (previousUser) return res.json({succes: false, message: "Error: Such email exists"});
  console.log('passed all insiders :D');
  //if there is error create newUser
  const newUser = new User({
    email, firstName, lastName
  });
  newUser.password = newUser.generateHash(password);
  console.log('new User = ', newUser);
  newUser.save().then(() => {
  const token = signToken(newUser);
  return res.json({success: true, token});
    // const token = JWT.sign({
    //     iss:'back-endtoken',
    //     sub:newUser._id,
    //     iat: new Date().getTime(), //curent time 
    //     exp:new Date().setDate(new Date().getDate() + 1)//curent time + 1dayahead
    //   }, 'secret')
    //   console.log(`${token}`);
    //   return res.json({success: true, token});
  });
} catch(err) {
    console.log(err);
    return res.json({success: false, err});
  }
  

  //respond with a token

  // res.status(200).json({token:token}); //meaning everything went ok
});
  
  // User.find({
  //   email:email
  // },(err, previousUser) => {
  //   console.log('err = ', err);
  //   console.log('prev user', previousUser);
  //   if(err) {
  //     return res.json({
  //       succes:false,
  //       message:'Error: Server error'
  //     })
  //   }else if(previousUser.lenght > 0 ) {
  //     return res.json({
  //       succes:false,
  //       message:'Error:Server error'
  //     });
  //   }
 
  // //save the new user
  // const newUser = new User();
  // newUser.email = email;
  // newUser.firstName = firstName;
  // newUser.lastName = lastName;
  // newUser.password = newUser.generateHash()
  // newUser.save((err, user) =>{
  //   if(err){
  //      return res.json({
  //       succes: false,
  //       message:'Error:Server error'
  //     });
  //   }
  //   return res.json({
  //     succes:true,
  //     message:'Sing up'
  //   })
  // });
  // });

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
