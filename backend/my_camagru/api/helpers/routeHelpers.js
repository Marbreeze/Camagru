const Joi = require('@hapi/joi');

module.exports = {
    validateBody: (schema) => {
      return async (req, res, next) => {
        
        const result = await schema.validate(req.body);
        console.log({result});
        if (result.error) {
          return res.status(400).json(result.error);
        }
  
        if (!req.value) { req.value = {}; }
        req.value['body'] = result.value;
        next();
      }
    },
  
    schemas: {
      authSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
      }),
      authSchemaSign: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
      })
    }
  };