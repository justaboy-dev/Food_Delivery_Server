const { json } = require('body-parser')
const { Bill } = require('../models/Schema')


const getBill = async (req, res, next) => {
  try {
      // console.log("req params: ", req.params);
    const { billID } = req.params

    const bill = await Bill.findById(billID)
  // console.log("user info", user)

    return res.status(200).json(bill)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getBillbyUserID = async (req, res, next) => {
  try {
      // console.log("req params: ", req.params);
    const { userID } = req.params

    const bill = await Bill.find({userID})
  // console.log("user info", user)

    return res.status(200).json(bill)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const index = async (req, res, next) => {
    const bills = await Bill.find({})
    return res.status(200).json( bills )
}


const newBill = async (req, res) => {
    try {

      const newBill = new Bill(req.body);
        await newBill.save();

      return res.status(201).json(newBill)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}




const updateBill = async (req, res, next) => {
  const { billID } = req.params;
  const newBill = req.body;
    const result = await Bill.findByIdAndUpdate(billID, newBill)

    return res.status(200).json({ success: true })
}



module.exports = { index, newBill, updateBill, getBill,getBillbyUserID }