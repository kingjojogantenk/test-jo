const moment = require("moment");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/jojo");

const dataISRSchema = new mongoose.Schema({
  No: String,
  Tanggal_Pemeriksaan: {
    type: Date,
    get: function (value) {
      return moment(value).locale("id").format("dddd, D MMMM YYYY");
    },
  },
  Metode_Pemeriksaan: String,
  No_Risalah_Hasil_Pemeriksaan: String,
  Client_Id: String,
  Client_Name: String,
  No_ISR: String,
  Link_ID: String,
  Stn_Name: String,
  Stasiun_Lawan: String,
  Long: String,
  Lat: String,
  Tx_Mhz: String,
  Rx_Mhz: String,
  BW_Khz: String,
  Merk: String,
  Kabupaten_Kota: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ISR_Data", dataISRSchema);
