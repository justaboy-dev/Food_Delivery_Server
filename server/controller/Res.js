const { Restaurant, Food } = require('../models/Schema')

const CreateRes = async (req, res) => {
  try {
    const newRes = req.body;

    const Res = new Restaurant(newRes);
    await Res.save();

    res.status(200).json(Res)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
const getRes = async (req, res, next) => {
  try {
    const { restaurantID } = req.params
    const ress = await Restaurant.findById(restaurantID)
    console.log(ress)
    return res.status(200).json( ress )
  } catch (err) {
    res.status(500).json({ error: err })
  }
  next()
}

const getByFoodID = async (req, res, next) => {
  try {
    const {foodID} = req.params
    const food = await Food.findById(foodID)
    const restaurant = await Restaurant.findById(food.restaurantID)
    return res.status(200).json( restaurant )
  } catch (err) {
    res.status(500).json({ error: err })
  }
  next()
}
const index = async (req, res) => {
    try{
      const ress = await Restaurant.find()
      return res.status(200).json( ress )
    }
    catch(err)
    {
      return res.status(500).json( err )
    }
}

const updateRes = async (req, res) => {

  try {
    const { restaurantID } = req.params
    const newRestaurant = req.body

    const result = await Restaurant.findByIdAndUpdate(restaurantID, newRestaurant)
  return res.status(200).json({ success: result })
  } catch (err) {
    res.status(500).json({ error: err })
  }
};

module.exports = {
  index,
  updateRes,
  CreateRes,
  getRes,
  getByFoodID 
}
