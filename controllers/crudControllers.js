const ISR_Data = require("../models/ISR_Data");
const mongoose = require("mongoose");
const moment = require("moment");

exports.postCustomer = async (req, res) => {
  const No = req.body.No;
  console.log(No);

  const newData = new ISR_Data({
    No: req.body.No,
    Name: req.body.Name,
    Tanggal_Pemeriksaan: req.body.Tanggal_Pemeriksaan,
    Metode_Pemeriksaan: req.body.Metode_Pemeriksaan,
    No_Risalah_Hasil_Pemeriksaan: req.body.No_Risalah_Hasil_Pemeriksaan,
    Client_Id: req.body.Client_Id,
    Client_Name: req.body.Client_Name,
    No_ISR: req.body.No_ISR,
    Link_ID: req.body.Link_ID,
    Stn_Name: req.body.Stn_Name,
    Stasiun_Lawan: req.body.Stasiun_Lawan,
    Long: req.body.Long,
    Lat: req.body.Lat,
    Tx_Mhz: req.body.Tx_Mhz,
    Rx_Mhz: req.body.Rx_Mhz,
    BW_Khz: req.body.BW_Khz,
    Merk: req.body.Merk,
    Kabupaten_Kota: req.body.Kabupaten_Kota,
  });
  try {
    await ISR_Data.create(newData);
    res.redirect("/data/list");
  } catch (err) {
    console.log(err);
  }
};

exports.getCustomer = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await ISR_Data.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await ISR_Data.count();
    res.render("showData", {
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
};

exports.postPemeriksaan = async (req, res) => {
  // const No = req.body.No;
  // console.log(No);

  const newData = new ISR_Data({
    Stn_Name: req.body.Stn_Name,
    Stasiun_Lawan: req.body.Stasiun_Lawan,
    Long: req.body.Long,
    Lat: req.body.Lat,
    Tx_Mhz: req.body.Tx_Mhz,
    Rx_Mhz: req.body.Rx_Mhz,
    BW_Khz: req.body.BW_Khz,
    Merk: req.body.Merk,
    Kabupaten_Kota: req.body.Kabupaten_Kota,
  });
  try {
    await Pemeriksaan_Data.create(newData);
    // res.redirect("/data/list");
  } catch (err) {
    console.log(err);
  }
};

// exports.getPemeriksaan = async (req, res) => {
//   let perPage = 12;
//   let page = req.query.page || 1;

//   try {
//     const data = await Pemeriksaan_Data.find({});
//     const customers = await Pemeriksaan_Data.aggregate([
//       { $sort: { createdAt: -1 } },
//     ])
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .exec();
//     const count = await Pemeriksaan_Data.count();
//     res.render("showDataPemeriksaan", {
//       data,
//       customers,
//       current: page,
//       pages: Math.ceil(count / perPage),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error retrieving data from database");
//   }
// };

exports.view = async (req, res) => {
  try {
    const customer = await ISR_Data.findOne({ _id: req.params.id });

    res.render("detailData", {
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const customer = await ISR_Data.findOne({ _id: req.params.id });

    res.render("edit_isr", {
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  try {
    await ISR_Data.findByIdAndUpdate(req.params.id, {
      No: req.body.No,
      Name: req.body.Name,
      Tanggal_Pemeriksaan: req.body.Tanggal_Pemeriksaan,
      Metode_Pemeriksaan: req.body.Metode_Pemeriksaan,
      No_Risalah_Hasil_Pemeriksaan: req.body.No_Risalah_Hasil_Pemeriksaan,
      Client_Id: req.body.Client_Id,
      Client_Name: req.body.Client_Name,
      No_ISR: req.body.No_ISR,
      Link_ID: req.body.Link_ID,
      Stn_Name: req.body.Stn_Name,
      Stasiun_Lawan: req.body.Stasiun_Lawan,
      Long: req.body.Long,
      Lat: req.body.Lat,
      Tx_Mhz: req.body.Tx_Mhz,
      Rx_Mhz: req.body.Rx_Mhz,
      BW_Khz: req.body.BW_Khz,
      Merk: req.body.Merk,
      Kabupaten_Kota: req.body.Kabupaten_Kota,
      updatedAt: Date.now(),
    });
    await res.redirect(`/data/list`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};
exports.deleteCustomer = async (req, res) => {
  try {
    await ISR_Data.deleteOne({ _id: req.params.id });
    res.redirect("/data/list");
  } catch (error) {
    console.log(error);
  }
};

exports.searchCustomers = async (req, res) => {

  try {
    let searchTerm = req.body.searchTerm;

    const customers = await ISR_Data.find({

      $or: [
        { Metode_Pemeriksaan: searchTerm},
        { No_Risalah_Hasil_Pemeriksaan: searchTerm},
        { Client_Id: searchTerm},
        { Client_Name: searchTerm},
        { Link_ID: searchTerm},
        { Long: searchTerm},
        { Lat: searchTerm},
        { Tx_Mhz: searchTerm},
        { Rx_Mhz: searchTerm},
        { BW_Khz: searchTerm},
        { Kabupaten_Kota: searchTerm},
        { No_ISR: searchTerm},
        { Stn_Name: searchTerm},
        { Stasiun_Lawan : searchTerm},
        { Merk : searchTerm},  
      ]
    });

    res.render("search", {
      customers,
      
    })
    
  } catch (error) {
    console.log(error);
  }
}

exports.filterCustomers = async (req, res) => {
  
  try {
    
    const Tanggal_Pemeriksaan = req.body.Tanggal_Pemeriksaan;
    const Kabupaten_Kota = req.body.Kabupaten_Kota;
    const new_Tanggal_Pemeriksaan = new Date(Tanggal_Pemeriksaan);

    
    let customers = [];

    if (Tanggal_Pemeriksaan === "" && Kabupaten_Kota === "") {
      customers = await ISR_Data.find();
    } else if (Tanggal_Pemeriksaan !== "" && Kabupaten_Kota === "") {
      customers = await ISR_Data.find({ Tanggal_Pemeriksaan : new_Tanggal_Pemeriksaan});
    } else if (Tanggal_Pemeriksaan === "" && Kabupaten_Kota !== "") {
      customers = await ISR_Data.find({ Kabupaten_Kota : Kabupaten_Kota});
    } else {
      customers = await ISR_Data.find({ Tanggal_Pemeriksaan : new_Tanggal_Pemeriksaan, Kabupaten_Kota: Kabupaten_Kota});
    }


    res.render("search", {
      customers,
      
    })
    
  } catch (error) {
    console.log(error);
  }
}