const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ISR_Data = require("../models/ISR_Data");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "mhakims secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "mhakims secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// const checkData = async (req, res, next) => {
//   const { Tx_Mhz, Rx_Mhz, BW_Khz, Merk } = req.body;

//   try {
//     const data = await ISR_Data.findOne({ Tx_Mhz, Rx_Mhz, BW_Khz, Merk });

//     if (data) {
//       // The data already exists in the database
//       res.locals.data = data;
//       next();
//     } else {
//       // The data does not exist in the database, create a new document
//       const newData = new ISR_Data({ Tx_Mhz, Rx_Mhz, BW_Khz, Merk });
//       const savedData = await newData.save();
//       res.locals.data = savedData;
//       next();
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

module.exports = { requireAuth, checkUser };
