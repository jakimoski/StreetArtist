import { getCurrentArtist, getItemsList } from "./utils/localstorage.js";
import { formatDate, generateDateLabels } from "./utils/dates.js";

const totalItemSold = document.querySelector("#total-items-sold");
const totalItemsIncome = document.querySelector("#total-items-income");
const auctionContainer = document.querySelector(".artist-home-total__auction");
const oneWeekChartBtn = document.querySelector(".chart-data-7");
const twoWeekChartBtn = document.querySelector(".chart-data-14");
const oneMonthChartBtn = document.querySelector(".chart-data-30");

// Chart main canvas
const ctx = document.getElementById("myChart").getContext("2d");

let myChart;

export function initArtistHomePage() {
  // Get current artist
  const currentArtist = getCurrentArtist();

  // Change activ class on chart btns
  document.querySelector(".btn--active")?.classList.remove("btn--active");
  oneWeekChartBtn.classList.add("btn--active");

  // Get current artist items
  let allItems = getItemsList();
  const artistItems = allItems.filter((item) => item.artist === currentArtist);

  // Check if artist has item on auction and display it on the page
  const hasAuction = artistItems.filter(
    (item) => item.isAuctioning && item.isPublished
  );
  auctionContainer.style.display = "none";
  if (hasAuction.length > 0) {
    auctionContainer.style.display = "block";
  }

  // Get all sold curent artist items
  const soldArtistItems = artistItems.filter((item) => item.priceSold);

  // Get total sum of all sold items
  const totalIncome = soldArtistItems.reduce(
    (acc, item) => acc + item.priceSold,
    0
  );
  // Set the value of total items sold and total income in dom
  totalItemSold.innerText = `${soldArtistItems.length}/${artistItems.length}`;
  totalItemsIncome.innerText = totalIncome.toLocaleString("mk", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  // Set how many days to be shown in chart
  let labels = generateDateLabels();
  //Function to Set Chart Data
  function getChartData(labels) {
    return labels.map((label) => {
      // Sum of all sold items
      let sum = 0;
      soldArtistItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum += item.priceSold;
        }
      });
      return sum;
    });
  }

  // Set cahrt data to cariable
  let chartData = getChartData(labels);

  // Function to create a Cahrt
  function createNewChart(labels, dataChart) {
    // Set chart data
    let data = {
      labels: labels,
      datasets: [
        {
          axis: "y",
          label: "amount",
          data: dataChart,
          fill: false,
          backgroundColor: ["#A16A5E"],
          hoverBackgroundColor: ["#D44C2E"],
          barThickness: 6,
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
  }
  // Call new chart function
  createNewChart(labels, chartData);

  // Function to update the chart
  function updateChartHandler(e, num) {
    labels = generateDateLabels(num);
    let chartData = getChartData(labels);
    createNewChart(labels, chartData);
    document.querySelector(".btn--active")?.classList.remove("btn--active");
    e.target.classList.add("btn--active");
  }

  oneWeekChartBtn.addEventListener("click", (e) => updateChartHandler(e, 7));

  twoWeekChartBtn.addEventListener("click", (e) => updateChartHandler(e, 14));

  oneMonthChartBtn.addEventListener("click", (e) => updateChartHandler(e, 30));
}
