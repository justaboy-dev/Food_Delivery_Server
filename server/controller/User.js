const { User } = require('../models/Schema')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs')
const AuthController = require('../controller/auth');
const { json } = require('body-parser');


const encodeToken = (userID) => {
  return jwt.sign({
    iss: "Khanh Long",
    sub: userID,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3)
  }, JWT_SECRET)
}

const getUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    const user = await User.findById(userID)
    return res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getUserByPhone = async (req, res, next) => {
  try {
    const { PhoneNumber } = req.params
    const user = await User.findOne({ PhoneNumber })
    return res.status(200).json(user)
  } catch (err) {
    res.status(500)
  }
}

const index = async (req, res, next) => {
  const users = await User.find({})
  return res.status(200).json(users)
}

const newUser = async (req, res, next) => {
  try {
    const { PhoneNumber, Password, FirstName, LastName, address, isDriver, Avatar } = req.body;
    const foundUser = await User.findOne({ PhoneNumber });
    if (foundUser) return res.status(403).json({success:false, message: "PhoneNumber is alrady is use" });
    const user = await AuthController.signUpAuth(PhoneNumber, Password);
    const newUser = new User({
      PhoneNumber,
      salt: user.salt,
      Password: user.Password,
      FirstName,
      LastName,
      address,
      isDriver,
      Avatar
    })
    newUser.save();
    const token = encodeToken(newUser._id);
    res.setHeader('Authorization', token)
    return res.status(201).json({ success: true, user: newUser.firstname })
    // newUser.save();
    // const newUser = new User(req.body)
    //   await newUser.save();
    //   return res.status(201).json({ user: newUser })
  }
  catch (err) {
    res.status(500).json({ error: err })
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    // const newUser = req.body
    const { PhoneNumber, Password, FirstName, LastName, address, isDriver, Avatar } = req.body
    const user = await AuthController.updatePassword(PhoneNumber, Password)
    const newUser = {
      PhoneNumber,
      salt: user.salt,
      Password: user.Password,
      LastName,
      FirstName,
      address,
      isDriver,
      Avatar
    }
    const result = await User.findByIdAndUpdate(userID, newUser)
    if (!result) return res.status(403).json({success: false, message: "userID is alrady is use" } );
    return res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const upLoad = async (req, res, next) => {
  const { userID } = req.params
  const { Image } = req.body
  if (!Image) {
    res.status(400).json({ "message": "Upload fail" })
  }
  else {
    const user = await User.findById(userID);
    if (!user) {
      res.status(400).json({ "message": "User not found" })
    }
    else {
      user.Avatar = Image;
      const update = await User.findByIdAndUpdate(userID, user)
      if (update) {
        res.status(200).json({ "message": "Upload success" })
      }
      else {
        res.status(400).json({ "message": "Upload fail" })
      }
    }
  }
}

const signUp = async (req, res, next) => {
  // console.log('call to signup')
  const {  FirstName, LastName, Password, PhoneNumber, Avatar, isDriver, address } = req.body
  // check if there is a user with the same user
  // console.log('found user', foundUser)
  // create a new user
  // const newUser = new User({ PhoneNumber, Password })
  const user = await AuthController.signUpAuth(PhoneNumber, Password)
  const newUser = new User({
    PhoneNumber,
    salt: user.salt,
    Password: user.Password,
    LastName,
    FirstName,
    Avatar,
    isDriver,
    address,
  })
  var insert = newUser.save();
  //encode 

  if(insert)
  {
    const token = encodeToken(newUser._id)
    res.setHeader('Authorization', token)
    return res.status(201).json({ success: true, message:"Register success",token:token })
  }
  else
  {
    return res.status(403).json({ success: false, message:"Register Fail" })
  }
  
}

const signIn = async (req, res, next) => {
  // console.log('call to signin')
  const { PhoneNumber, Password } = req.body
  const newUser = await AuthController.signInAuth(PhoneNumber, Password)

  const token = encodeToken(req._id)
  res.setHeader('Authorization', token)
  if (newUser == true) {
    return res.status(200).json({ success: true, message: token })
  }
  else {
    return res.status(401).json({ success: false, message: newUser })
  }


}

const secret = async (req, res, next) => {

  return res.status(200).json({ resource: true })
}

const checkExist = async (req,res,next) =>{
  const { PhoneNumber } = req.params
  const existingUser = await User.findOne( { PhoneNumber } )
  if(existingUser)
  {
    res.status(200).json({success:true, message:"Phone number is already in use !"})
  }
  else
  {
    res.status(200).json({success:false})
  }
}

module.exports = {
  index,
  newUser,
  getUser,
  updateUser,
  signUp,
  signIn,
  secret,
  upLoad,
  checkExist,
  getUserByPhone
}

