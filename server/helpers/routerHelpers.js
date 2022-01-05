const Joi = require('@hapi/joi')


const validateBody = (schema) => {
  return (req, res, next) => {
    // const validatorResult = schema.validate(req.body);
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value['params']) req.value.params = {};
      console.log(' validatorResult', validatorResult);
      req.value.body = validatorResult.value
      next();
    }
  }
}

const validateParam = (schema, name) => {
  return (req, res, next) => {
    // console.log("param", req.params[name]);
    const validatorResult = schema.validate({ param: req.params[name] })
    // console.log("validatorResult :", validatorResult)
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      // console.log('1', req.value)
      if (!req.value) req.value = {};
      // console.log('2', req.value.params)
      if (!req.value['params']) req.value.params = {};
      // console.log('3', req.value)
      req.value.params[name] = req.params[name]
      // console.log('req value', req.value)
      next();
    }
  }
}

const schemas = {
  authSignInSchema: Joi.object().keys({
    PhoneNumber: Joi.string().min(10).required(),
    Password: Joi.string().min(8).required(),
  }),
  authSignUpSchema: Joi.object().keys({
    FirstName: Joi.string().min(2).required(),
    LastName: Joi.string().min(2).required(),
    PhoneNumber: Joi.string().min(10).required(),
    Password: Joi.string().min(8).required(),
  }),
  isSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  userSchema: Joi.object().keys({
    FirstName: Joi.string().min(2).required(), 
    LastName: Joi.string().min(2).required(),
    Password: Joi.string().min(8).required(),
    AvatarURL: Joi.string(),
    PhoneNumber: Joi.string().min(10).required(),

    Role: Joi.object().keys({
      User: Joi.number().min(1),
      Driver: Joi.number().min(1)
    }),
    address: Joi.object().keys({
      long: Joi.number(),
      lat: Joi.number()
    }),
  }),

  userOptionalSchema: Joi.object().keys({
    FirstName: Joi.string().min(2),
    LastName: Joi.string().min(2),
    Password: Joi.string().min(8),
    AvatarURL: Joi.string(),
    PhoneNumber: Joi.string().min(10),

    Role: Joi.object().keys({
      User: Joi.number().min(1),
      Driver: Joi.number().min(1)
    }),
    address: Joi.object().keys({
      long: Joi.number(),
      lat: Joi.number()
    }),
  }),


  ResSchema: Joi.object().keys({
    Name: Joi.string().min(2).required(),
    OpenTime: Joi.string().min(2).required(),
    Food: Joi.object().keys({
      FoodName: Joi.string().min(1),
      Price: Joi.number().min(5),
      Overview: Joi.string().min(5),
      ImgFood: Joi.string()
    }),
    Rate: Joi.number()
  }),

  ResOptionalSchema: Joi.object().keys({
    Name: Joi.string().min(2),
    OpenTime: Joi.string().min(2),
    Food: Joi.object().keys({
      FoodName: Joi.string().min(1),
      Price: Joi.number().min(5),
      Overview: Joi.string().min(5),
      ImgFood: Joi.string()
    }),
    Rate: Joi.number()
  }),


  billSchema: Joi.object().keys({
    UserID: Joi.string().min(1),
    RestaurantID: Joi.string().min(1),
    DriverID: Joi.string().min(1),
    Food: Joi.object().keys({
      FoodName: Joi.string().min(1),
      Price: Joi.number().min(5),
      Description: Joi.string().min(5),
      Amout: Joi.number(),
      Cash: Joi.number(),
    }),
    Rate: Joi.number()
  }),

  billOptionnalSchema: Joi.object().keys({
    UserID: Joi.string().min(1),
    RestaurantID: Joi.string().min(1),
    DriverID: Joi.string().min(1),
    Food: Joi.object().keys({
      FoodName: Joi.string().min(1),
      Price: Joi.number().min(5),
      Description: Joi.string().min(5),
      Amout: Joi.number(),
      Cash: Joi.number(),
    }),
    Rate: Joi.number()
  }),
}

module.exports = {
  validateParam,
  validateBody,
  schemas,
}