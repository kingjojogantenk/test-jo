const axios = require("axios");

axios
  .get("http://localhost:3010/statusCount")
  .then((response) => {
    const data = response.data;
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item._id === "KAPUAS HULU") {
          console.log(`_id: ${item._id}, Sesuai_ISR: ${item.Sesuai_ISR}`);
        }
      });
    } else {
      console.error("Data is not an array");
    }
  })
  .catch((error) => {
    console.error(error);
  });
