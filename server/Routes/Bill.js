const router = require("express-promise-router")()
const BillController = require('../controller/Bill')


router.route('/')
  .get(BillController.index)
  .post(BillController.newBill)


router.route('/:billID')
  .get(BillController.getBill)
  .put(BillController.updateBill)



module.exports = router;
