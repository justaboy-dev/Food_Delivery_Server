const router = require("express-promise-router")()

const FoodController = require('../controller/food')

router.route('/')
  .get(FoodController.index)


router.route('/getbyres/:restaurantID').get(FoodController.getByRestaurantID)

module.exports = router;