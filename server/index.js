const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const orderFood = require('./Routes');
const bodyParser = require('body-parser');
// const Bill = require('./Routes/Bill')
// const Res = require('./Routes/Res');
// const User = require('./Routes/User')
// const Auth = require('./Routes/auth')
dotenv.config();

const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
// }));
app.use(express.json({limit:'50mb'}))
//app.use(bodyParser.json({limit:'50mb'}))

app.use("/orderfood", orderFood)

// app.use('/auth', Auth)
// app.use('/user', User)
// app.use('/bill', Bill)
// app.use('/restaurant', Res)

mongoose
  .connect('mongodb://localhost:27017/orderfood',
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected database from mongodb.');
    app.listen(5000, () => {
      console.log(`Server is running on port 5000`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });
