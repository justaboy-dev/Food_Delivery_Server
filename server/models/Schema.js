const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    // required: true,
  },
  Avatar: {
    type: String
  },
  isDriver: {
    type: Boolean,
    default: false,
  },
  address: {
    fullAddress: String,
    long: Number,
    lat: Number,
  },
  salt: {
    type: String
  },
})

const User = mongoose.model('User', UserSchema);

const FoodSchema = new mongoose.Schema({
  FoodName:
  {
    type: String,
    required: true,
  },
  Price:
  {
    type: Number,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    default: 0
  },
  Image: {
    type: String,
    required: true
  },
  Space: {
    type: Number,
    default: 0
  },
  Minute: {
    type: Number,
    default: 0
  },
  restaurantID:{
    type:String,
    required:true
  }
})

const Food = mongoose.model('Food', FoodSchema);

const RestaurantSchema = new mongoose.Schema({
  Name: {
    type: String
  },
  Opentime: {
    type: String
  },
  Closetime: {
    type: String
  },
  Rate: {
    type: Number,
    default: 0
  },
  address: {
    fullAddress: String,
    long: Number,
    lat: Number,
  },
  Space: {
    type: Number,
    default: 0
  },
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

const BillingSchema = new mongoose.Schema({

  UserID: {
    type: String,
    required: true
  },
  RestaurantID: {
    type: String,
    required: true
  },
  DriverID: {
    type: String,
  },
  Cash: {
    type: Number,
    required: true
  },
  Food:
  [
    {
      FoodID:{
        type:String,
        required:true
      },
      FoodAmount:{
        type:Number,
        default:1
      }
    }
  ],
  Status: {
    type: String,
    required: true
  },
  Rate: {
    type: Number,
    required: true
  },

}
, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})
const Bill = mongoose.model('Bill', BillingSchema);

module.exports = { User, Restaurant, Bill,Food };