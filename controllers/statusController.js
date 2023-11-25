// const status = require("../models/status");
const mongoose = require("mongoose");

const ISR_Data = require("../models/ISR_Data");
const Pemeriksaan_Data = require("./Pemeriksaan_Data");

exports.getStatus = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send("Error !!");
  }
};
