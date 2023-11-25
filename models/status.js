const ISR_Data = require("../models/ISR_Data");
const Pemeriksaan_Data = require("./Pemeriksaan_Data");

ISR_Data.findById(isrId)
  .populate({
    path: "pemeriksaan",
    model: "Pemeriksaan_Data",
    match: {
      Tx_Mhz: pemeriksaanData.Tx_Mhz,
      Rx_Mhz: pemeriksaanData.Rx_Mhz,
      BW_Khz: pemeriksaanData.BW_Khz,
      Merk: pemeriksaanData.Merk,
    },
  })
  .exec((err, isr) => {
    if (err) {
      console.error(err);
      return;
    }

    // Check if the related document exists
    if (isr.pemeriksaan) {
      console.log("The data matches");
    } else {
      console.log("The data does not match");
    }
  });
