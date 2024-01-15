import { items } from "./data/data.js";
import { getCurrentArtist } from "./globals.js";
import { formatDate, generateDateLabels } from "./utils/dates.js";

let myChart;

export function initArtistHomePage() {
  // Get current artist
  const currentArtist = getCurrentArtist();

  // Get current artist items
  const artistItems = items.filter((item) => item.artist === currentArtist);

  // Get all sold curent artist items
  const soldArtistItems = artistItems.filter((item) => !!item.priceSold);

  // Set how many days to be shown in chart
  const labels = generateDateLabels(7);

  // Chart main canvas
  const ctx = document.getElementById("myChart").getContext("2d");

  // Set data for all dates on cahart
  let chartData = labels.map((label) => {
    // Sum of all sold items /// I SHOLUD REMAKE THIS WITH REDUCE METHOD ////////
    let sum = 0;
    soldArtistItems.forEach((item) => {
      if (label === formatDate(item.dateSold)) {
        sum += item.priceSold;
      }
    });
    return sum;
  });

  // myChart = new Chart(ctx, {
  //   type: "bar",
  //   data: {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "amount",
  //         data: chartData,
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  //   options: {
  //     indexAxis: "y",
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // });

  // Set chart data
  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "amount",
        data: chartData,
        fill: false,
        backgroundColor: ["#A16A5E"],
        hoverBackgroundColor: ["#D44C2E"],
        barThickness: 8,
        borderWidth: 1,
      },
    ],
  };

  // Set chart config
  const config = {
    type: "bar",
    data: data,
    options: {
      maintainAspectRatio: true,
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  // Set new charts
  if (!myChart) {
    myChart = new Chart(ctx, config);
  }
  if (myChart) {
    myChart.destroy();
    myChart = new Chart(ctx, config);
  }

  // const chartData14 = chartData.map(
  //   (data) => data / (Math.random() > 0.5 ? 2 : 3)
  // );
  // function updateChart() {
  //   myChart.clear();
  //   myChart.data.datasets[0].data = chartData14;
  //   myChart.update();
  // }
  // updateChart();
}
