const mongoose = require("mongoose");
const Pemeriksaan_Data = require("./Pemeriksaan_Data");

// mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://127.0.0.1:27017/jojo");

const statusCountSchema = new mongoose.Schema({
  Kabupaten_Kota: String,
  Status: String,
});

// define model for Pemeriksan Data

const countSesuaiISR = Pemeriksaan_Data.countDocuments({
  Status: "Sesuai ISR",
});
const countTidakSesuaiISR = Pemeriksaan_Data.countDocuments({
  Status: "Tidak Sesuai ISR",
});
const countTidakBerizin = Pemeriksaan_Data.countDocuments({
  Status: "Tidak Berizin",
});
const countTidakAktif = Pemeriksaan_Data.countDocuments({
  Status: "Tidak Aktif",
});

console.log(`Sesuai ISR: ${countSesuaiISR}`);
console.log(`Tidak Sesuai ISR: ${countTidakSesuaiISR}`);
console.log(`Tidak Berizin: ${countTidakBerizin}`);
console.log(`Tidak Aktif: ${countTidakAktif}`);

module.exports = mongoose.model("Status_count", statusCountSchema);


