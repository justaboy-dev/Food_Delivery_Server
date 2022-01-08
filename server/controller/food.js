const { Food } = require("../models/Schema")

const index = async (req,res)=>{
    try {
        const food = await Food.find()
        console.log(food)
        return res.status(200).json(food)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}


const getByRestaurantID = async (req,res,next)=>{
    try {
        const {restaurantID} = req.params
        const food = await Food.find({restaurantID})
        return res.status(200).json(food)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}


module.exports = {
    index,
    getByRestaurantID,
}