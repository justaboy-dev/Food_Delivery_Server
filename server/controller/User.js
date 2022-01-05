const { User } = require('../models/Schema')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs')
const AuthController = require('../controller/auth')


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

const index = async (req, res, next) => {
  const users = await User.find({})
  return res.status(200).json(users)
}

const newUser = async (req, res, next) => {
  try {
    const { PhoneNumber, Password, FirstName, LastName, address, Role, Avatar } = req.body;
    const foundUser = await User.findOne({ PhoneNumber });
    if (foundUser) return res.status(403).json({ error: { message: "PhoneNumber is alrady is use" } });
    const user = await AuthController.signUpAuth(PhoneNumber, Password);
    const newUser = new User({
      PhoneNumber,
      salt: user.salt,
      hashed: user.hashed,
      FirstName,
      LastName,
      address,
      Role,
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
    console.log(err)
    res.status(500).json({ error: err })
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    // const newUser = req.body
    const { PhoneNumber, Password, FirstName, LastName, address, Role, Avatar } = req.body
    const user = await AuthController.updatePassword(PhoneNumber, Password)
    const newUser = {
      PhoneNumber,
      salt: user.salt,
      hashed: user.hashed,
      LastName,
      FirstName,
      address,
      Role,
      Avatar
    }
    const result = await User.findByIdAndUpdate(userID, newUser)
    if (!result) return res.status(403).json({ error: { message: "userID is alrady is use" } });
    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
}

const upLoad = async (req, res, next) => {
  const { userID } = req.params
  console.log(userID)
  const { Image } = req.body
  if (!Image) {
    res.status(400).json({ "message": "Upload fail" })
  }
  else {
    console.log(Image)
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
  const { PhoneNumber, Password, FirstName, LastName } = req.body
  // check if there is a user with the same user
  const foundUser = await User.findOne({ PhoneNumber })
  // console.log('found user', foundUser)
  if (foundUser) return res.status(403).json({ error: { message: 'PhoneNumber is already is use' } })
  // create a new user
  // const newUser = new User({ PhoneNumber, Password })
  const user = await AuthController.signUpAuth(PhoneNumber, Password)
  const newUser = new User({
    PhoneNumber,
    salt: user.salt,
    hashed: user.hashed,
    LastName,
    FirstName,
  })
  newUser.save();
  //encode 
  const token = encodeToken(newUser._id)
  res.setHeader('Authorization', token)
  return res.status(201).json({ success: true, token })
}

const signIn = async (req, res, next) => {
  // console.log('call to signin')
  const { PhoneNumber, Password } = req.body
  console.log(PhoneNumber, Password)
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

module.exports = {
  index,
  newUser,
  getUser,
  updateUser,
  signUp,
  signIn,
  secret,
  upLoad,
}

