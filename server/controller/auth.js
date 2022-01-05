const { User } = require('../models/Schema')
const crypto = require("crypto");

const signUpAuth = async (PhoneNumber, Password) => {
  const existingUser = await User.findOne({ PhoneNumber: PhoneNumber })
  if (existingUser) {
    throw new Error("PhoneNumber already existed");
  }
  const user = {
    PhoneNumber: PhoneNumber
  };
  const { salt, hashed } = generatePassword(Password);
  user.salt = salt;
  user.hashed = hashed;
  return user
}
const signInAuth = async (PhoneNumber, Password) => {
  const existingUser = await User.findOne({ PhoneNumber: PhoneNumber })
  if (!existingUser) {
    return "PhoneNumber does not exist";
  }
  if (!verifyPassword(Password, existingUser.salt, existingUser.hashed)) {
    return "Password is not correct!";
  }
  return true;
}
const updatePassword = async (PhoneNumber, Password) => {

  const user = {
    PhoneNumber: PhoneNumber
  };
  const { salt, hashed } = generatePassword(Password);
  user.salt = salt;
  user.hashed = hashed;
  return user
}
const generatePassword = (password) => {
  //key
  const salt = crypto.randomBytes(128).toString("base64");

  //pbkdf2Sync  mã hóa mật khẩu
  // vong lặp 10000
  // độ dài 2056
  // thuật toán mã hóa sha512
  const hashedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    10000,
    256,
    "sha512"
  );
  return {
    hashed: hashedPassword.toString("hex"),
    salt: salt,
  };
};
const verifyPassword = (password, salt, hashedPassword) => {
  const hashed = crypto.pbkdf2Sync(password, salt, 10000, 256, "sha512");
  return hashed.toString("hex") == hashedPassword;
};

module.exports = {
  signUpAuth,
  signInAuth,
  updatePassword
}