const mongoose = require("mongoose");
// Define schema for Data Pemeriksaan

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect("mongodb://127.0.0.1:27017/jojo");

const dataPemeriksaanSchema = new mongoose.Schema({
  // ISR Data
  No_ISR: String,
  Stn_Name: String,
  Stasiun_Lawan: String,
  Long: String,
  Lat: String,
  Tx_Mhz: String,
  Rx_Mhz: String,
  BW_Khz: String,
  Merk: String,
  Kabupaten_Kota: String,
  Sertifikasi_Perangkat: String,
  Status: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// define model for Pemeriksan Data

module.exports = mongoose.model("Pemeriksaan_Data", dataPemeriksaanSchema);
