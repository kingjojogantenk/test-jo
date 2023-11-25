const Pemeriksaan_Data = require("../models/Pemeriksaan_Data");
const mongoose = require("mongoose");
const ISR_Data = require("../models/ISR_Data");
exports.postPemeriksaan = async (req, res) => {
  console.log(req.body.Stn_Name);

  const newData = new Pemeriksaan_Data({
    No_ISR: req.body.No_ISR,
    Stn_Name: req.body.Stn_Name,
    Stasiun_Lawan: req.body.Stasiun_Lawan,
    Long: req.body.Long,
    Lat: req.body.Lat,
    Tx_Mhz: req.body.Tx_Mhz,
    Rx_Mhz: req.body.Rx_Mhz,
    BW_Khz: req.body.BW_Khz,
    Merk: req.body.Merk,
    Kabupaten_Kota: req.body.Kabupaten_Kota,
    Sertifikasi_Perangkat: req.body.Sertifikasi_Perangkat,
    Status: " ",
  });

  const isrData = await ISR_Data.findOne({
    Tx_Mhz: newData.Tx_Mhz,
    Rx_Mhz: newData.Rx_Mhz,
    BW_Khz: newData.BW_Khz,
    Merk: newData.Merk,
  });

  if (newData.No_ISR === "#N/A") {
    newData.Status = "Tidak Berizin";
  } else {
    if (isrData) {
      newData.Status = "Sesuai ISR";
    }
    if (!isrData) {
      newData.Status = "Tidak Sesuai ISR";
    }

    if (
      newData.Tx_Mhz === "-" ||
      newData.Rx_Mhz === "-" ||
      newData.BW_Khz === "-" ||
      newData.Merk === "-"
    ) {
      newData.Status = "Tidak Aktif";
    }
  }

  try {
    await Pemeriksaan_Data.create(newData);
    res.redirect("/data/Pemeriksaan");
  } catch (err) {
    console.log(err);
  }
};

exports.getCustomer = async (req, res) => {
  let perPage = 10;
  let page = req.query.page || 1;

  try {
    
    const customers = await Pemeriksaan_Data.aggregate([
      { $sort: { createdAt: -1 } },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Pemeriksaan_Data.count();
    res.render("showDataPemeriksaan", {
      
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
};

exports.getStatus = async (req, res) => {
  try {
    const isrDataQuery = ISR_Data.find();
    const pemeriksaanDataQuery = Pemeriksaan_Data.find();
    const [isrData, pemeriksaanData] = await Promise.all([
      isrDataQuery.exec(),
      pemeriksaanDataQuery.exec(),
    ]);

    isrData.forEach((isr) => {
      pemeriksaanData.forEach((pemeriksaan) => {
        if (
          isr.Tx_Mhz === pemeriksaan.Tx_Mhz &&
          isr.Rx_Mhz === pemeriksaan.Rx_Mhz &&
          isr.BW_Khz === pemeriksaan.BW_Khz &&
          isr.Merk === pemeriksaan.Merk
        ) {
          console.log(
            `isr ${isr.Tx_Mhz} is the same as pemeriksaan ${pemeriksaan.Tx_Mhz}` +
              `isr ${isr.Rx_Mhz} is the same as pemeriksaan ${pemeriksaan.Rx_Mhz}` +
              `isr ${isr.BW_Khz} is the same as pemeriksaan ${pemeriksaan.BW_Khz}` +
              `isr ${isr.Merk} is the same as pemeriksaan ${pemeriksaan.Merk}`
          );
          console.log("same");
        } else {
          console.log("tidak sma");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.view = async (req, res) => {
  try {
    const customer = await Pemeriksaan_Data.findOne({ _id: req.params.id });

    res.render("detailPemeriksaan", {
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const customer = await Pemeriksaan_Data.findOne({ _id: req.params.id });

    res.render("edit_pemeriksaan", {
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  try {
    await Pemeriksaan_Data.findByIdAndUpdate(req.params.id, {
      // No: req.body.No,
      No_ISR: req.body.No_ISR,
      Stn_Name: req.body.Stn_Name,
      Stasiun_Lawan: req.body.Stasiun_Lawan,
      Long: req.body.Long,
      Lat: req.body.Lat,
      Tx_Mhz: req.body.Tx_Mhz,
      Rx_Mhz: req.body.Rx_Mhz,
      BW_Khz: req.body.BW_Khz,
      Merk: req.body.Merk,
      Kabupaten_Kota: req.body.Kabupaten_Kota,
      Sertifikasi_Perangkat: req.body.Sertifikasi_Perangkat,
      updatedAt: Date.now(),
    });
    await res.redirect(`/pemeriksaan/list`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};
exports.deleteCustomer = async (req, res) => {
  try {
    await Pemeriksaan_Data.deleteOne({ _id: req.params.id });
    res.redirect("/pemeriksaan/list");
  } catch (error) {
    console.log(error);
  }
};

exports.getKotaISR = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$Kabupaten_Kota",
          Sesuai_ISR: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Sesuai ISR"] }, 1, 0],
            },
          },
          Tidak_Sesuai_ISR: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Tidak Sesuai ISR"] }, 1, 0],
            },
          },
          Tidak_Berizin: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Tidak Berizin"] }, 1, 0],
            },
          },
          Tidak_Aktif: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Tidak Aktif"] }, 1, 0],
            },
          },
        },
      },
    ];

    const result = await Pemeriksaan_Data.aggregate(pipeline);

    res.render("chart", {
      result,
    });

    // res.json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.getStatusISR = async (req, res) => {
  try {
    const countSesuaiISR = await Pemeriksaan_Data.countDocuments({
      Status: "Sesuai ISR",
    });
    const countTidakSesuaiISR = await Pemeriksaan_Data.countDocuments({
      Status: "Tidak Sesuai ISR",
    });
    const countTidakBerizin = await Pemeriksaan_Data.countDocuments({
      Status: "Tidak Berizin",
    });
    const countTidakAktif = await Pemeriksaan_Data.countDocuments({
      Status: "Tidak Aktif",
    });

    const pipeline = [
      {
        $group: {
          _id: "$Kabupaten_Kota",
          Sesuai_ISR: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Sesuai ISR"] }, 1, 0],
            },
          },
          Tidak_Sesuai_ISR: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Tidak Sesuai ISR"] }, 1, 0],
            },
          },
          Tidak_Berizin: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Tidak Berizin"] }, 1, 0],
            },
          },
          Tidak_Aktif: {
            $sum: {
              $cond: [{ $eq: ["$Status", "Tidak Aktif"] }, 1, 0],
            },
          },
        },
      },
    ];

    const result = await Pemeriksaan_Data.aggregate(pipeline);

    res.render("home", {
      countSesuaiISR,
      countTidakSesuaiISR,
      countTidakBerizin,
      countTidakAktif,
      result,
    });

    console.log(`Sesuai ISR: ${countSesuaiISR}`);
    console.log(`Tidak Sesuai ISR: ${countTidakSesuaiISR}`);
    console.log(`Tidak Berizin: ${countTidakBerizin}`);
    console.log(`Tidak Aktif: ${countTidakAktif}`);
  } catch (err) {
    console.error(err);
  }
};

exports.searchpemeriksaandata = async (req, res) => {

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Pemeriksaan_Data.find({
      $or: [
          { Lat: searchTerm},
          { Tx_Mhz: searchTerm},
          { Rx_Mhz: searchTerm},
          { BW_Khz: searchTerm},
          { Kabupaten_Kota: searchTerm},
          { No_ISR: searchTerm},
          { Stn_Name: searchTerm},
          { Stasiun_Lawan : searchTerm},
          { Merk : searchTerm},  
          { Status : searchTerm},  
      ]
    });

    res.render("search_pemeriksaan", {
      customers,
      
    })
    
  } catch (error) {
    console.log(error);
  }
}


exports.filterpemeriksaandata = async (req, res) => {
  
  try {
    
    const Status = req.body.Status;
    const Kabupaten_Kota = req.body.Kabupaten_Kota;
    let customers = [];
    if (Status === "" && Kabupaten_Kota === "") {
      customers = await Pemeriksaan_Data.find();
    } else if (Status !== "" && Kabupaten_Kota === "") {
      customers = await Pemeriksaan_Data.find({ Status : Status});
    } else if (Status === "" && Kabupaten_Kota !== "") {
      customers = await Pemeriksaan_Data.find({ Kabupaten_Kota : Kabupaten_Kota});
    } else {
      customers = await Pemeriksaan_Data.find({ Status : Status, Kabupaten_Kota: Kabupaten_Kota});
    }

    
    // if(Tanggal_Pemeriksaan) {
    //   const new_Tanggal_Pemeriksaan = new Date(Tanggal_Pemeriksaan);
    //   const query = { Tanggal_Pemeriksaan: new_Tanggal_Pemeriksaan, Kabupaten_Kota: Kabupaten_Kota }
    //   customers = await ISR_Data.find(query);
    // }


    res.render("search_pemeriksaan", {
      customers,
      
    })
    
  } catch (error) {
    console.log(error);
  }
}