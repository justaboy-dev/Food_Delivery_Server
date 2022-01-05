const { Restaurant } = require('../models/Schema')

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

// const getResByFoodID = async (req, res, next) => {
//   try {
//     // console.log(req.params)
//     const restaurantID = req.params.restaurantID
//     // console.log(restaurantID)
//     const foodID = req.params.foodID
//     // console.log(foodID)
//     const Res = await Restaurant.findById(restaurantID)
//     // console.log(Res.Food)
//     return res.status(200).json(Res.Food)
//   } catch (err) {
//     res.status(500).json({ error: err })
//   }

// }
const index = async (req, res) => {
    try{
      const ress = await Restaurant.find({})
    return res.status(200).json( ress )
    }
    catch(err)
    {
      return res.status(500).json( ress )
    }
}

const updateRes = async (req, res) => {

  try {
    const { restaurantID } = req.params
    const newRestaurant = req.body

    const result = await Restaurant.findByIdAndUpdate(restaurantID, newRestaurant)
  return res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err })
  }
};
module.exports = {
  index,
  updateRes,
  CreateRes,
  getRes,
  // getResByFoodID 
}
