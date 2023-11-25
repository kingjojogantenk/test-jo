// const Apexcharts = require("apexcharts");
import ApexCharts from "apexcharts";
var options = {
  series: [
    {
      name: "Sesuai ISR",
      data: [10, 9, 14, 1, 4, 5, 14, 22, 6, 35, 0, 19],
    },
    {
      name: "Tidak Berizin",
      data: [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    },
    {
      name: "Tidak Sesuai Parameter",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Tidak Aktif",
      data: [4, 4, 15, 2, 3, 0, 10, 17, 3, 11, 1, 19],
    },
  ],
  chart: {
    type: "bar",
    height: 450,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "Sekadau ",
      "Sintang",
      "Sanggau",
      "Pontianak",
      "Mempawah",
      "Melawi",
      "Landak",
      "Kuburaya",
      "Kota Pontianak",
      "Ketapang",
      "Kayong Utara",
      "Kapuas Hulu",
    ],
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands";
      },
    },
  },
};

var chart = new ApexCharts(document.querySelector("#chartline"), options);
chart.render();
