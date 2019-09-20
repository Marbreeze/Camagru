const externalRoutes = require('express').Router();
const usersRouter = require('./users');
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas} = require('../helpers/routeHelpers');

   console.log(usersRouter);

externalRoutes.route('/signup')
        .post(validateBody(schemas.authSchemaSign), usersRouter.signup);

externalRoutes.route('/login')
       .post(validateBody(schemas.authSchema),usersRouter.login);


externalRoutes.route('/secret')
        .get(passport.authenticate('jwt',{ session:false}),usersRouter.secret);

module.exports = externalRoutes;



                