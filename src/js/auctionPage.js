import {
  getCurrentArtist,
  getItemsList,
  resetTimerValue,
  updateLocalStorage,
  getLocalStorage,
} from "./utils/localstorage.js";
import { currentItemIndex } from "./artistItemsPage.js";

const autctionItemWrapper = document.querySelector(".auction-items-wrapper");
const bidBtn = document.querySelector("#bidBtn");
const bidInput = document.querySelector("#biddingInput");
const biddingHistory = document.querySelector("#biddingHistory");
const highestBidEl = document.querySelector("#highest-auction-bid");
const auctionPage = document.querySelector(".auction");
const timerValue = document.querySelector(".bidding-timer__time");
const artistHomeBid = document.querySelector("#current-bid-artisit-home");

export const initAuctionPage = () => {
  const currentArtist = getCurrentArtist();
  let itemsList = getItemsList();
  let auctionItem = getLocalStorage("AuctionItem");

  const itemToUpdate = itemsList[currentItemIndex];

  let time;
  let highestBid = 0;

  //   Initial price of item is half from the current bidding item object property “price” (item.price / 2)
  let initialPrice = Math.ceil(+auctionItem?.price / 2);
  bidInput.value = initialPrice;

  // Create new date
  const date = new Date().toISOString();

  // Empty div and render auction card
  if (!!auctionItem) {
    auctionPage.style.display = "block";
    if (document.querySelector(".no-items-box"))
      document.querySelector(".no-items-box").style.display = "none";
    autctionItemWrapper.innerHTML = "";
    renderAuctionCard(auctionItem);
    setInterval(function () {
      time = parseInt(localStorage.getItem("interval"));
      if (time >= 0) timerValue.textContent = formatTime(time);
      if (time === 0 && +highestBid >= +initialPrice) {
        itemToUpdate.dateSold = date;
        itemToUpdate.priceSold = +highestBid || "";
        itemToUpdate.isAuctioning = false;
        updateLocalStorage("itemsList", itemsList);
        timerValue.textContent = "Auction ended";
        localStorage.removeItem("AuctionItem");
      }
      if (time === 0 && +highestBid < +initialPrice) {
        itemToUpdate.isAuctioning = false;
        updateLocalStorage("itemsList", itemsList);
        timerValue.textContent = "Auction ended";
        localStorage.removeItem("AuctionItem");
      }
    }, 1000);
    if (auctionItem.artist === currentArtist) {
      bidBtn.disabled = true;
    } else {
      bidBtn.disabled = false;
    }
  }
  // If no auction show a message
  if (auctionItem === null) {
    auctionPage.style.display = "none";
    renderNoItemMessage();
  }

  highestBidEl.textContent = getLocalStorage("highestBid") || 0;

  // Add event handler on bid btn
  bidBtn.addEventListener("click", function (e) {
    e.stopImmediatePropagation();

    const myBidFormData = new FormData();
    myBidFormData.set("amount", bidInput.value);

    biddingHistory.innerHTML += `<li class="mine"> My bid: ${bidInput.value}$</li>`;

    fetch("https://projects.brainster.tech/bidding/api", {
      method: "POST",
      body: myBidFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        const isBidding = data.isBidding;

        if (isBidding) {
          resetTimerValue();
          highestBid = data.bidAmount.toLocaleString("mk", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          });
          updateLocalStorage("highestBid", highestBid);
          biddingHistory.innerHTML += `<li class="bidder"> User bid: ${highestBid}</li>`;
          const upBeat = data.bidAmount + 50;
          bidInput.value = upBeat;
          highestBidEl.textContent = data.bidAmount;
        } else {
          highestBid = bidInput.value.toLocaleString("mk", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          });
          updateLocalStorage("highestBid", highestBid);
          highestBidEl.textContent =
            artistHomeBid.textContent = `${bidInput.value.toLocaleString("mk", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}`;
          bidBtn.disabled = true;

          setInterval(function () {
            if (time === 0 && +highestBid >= +initialPrice) {
              itemToUpdate.dateSold = date;
              itemToUpdate.priceSold = +highestBid || "";
              itemToUpdate.isAuctioning = false;
              updateLocalStorage("itemsList", itemsList);
              timerValue.textContent = "Auction ended";
              localStorage.removeItem("AuctionItem");
            }
            if (time === 0 && +highestBid < +initialPrice) {
              itemToUpdate.isAuctioning = false;
              updateLocalStorage("itemsList", itemsList);
              timerValue.textContent = "Auction ended";
              localStorage.removeItem("AuctionItem");
            }
          }, 1000);
        }
      });
  });
};

// Function to render auction items cards
function renderAuctionCard(item) {
  const card = `<div" class="auction-item-card">
        <div class="auction-item-card__img">
            <img src="${item.image}" alt="${item.title}" />
        </div>
        <div class="auction-item-card__content">
          <div class="auction-item-card__info">
            <h4 class="auction-item-card__artist">${item.artist}</h4>
            <span class="auction-item-card__price">${(
              item.price / 2
            ).toLocaleString("mk", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}</span>
          </div>
          <h5 class="auction-item-card__title">${item.title}</h5>
          <p class="auction-item-card__desc">${item.description}</p>
        </div>
    </div>`;

  autctionItemWrapper.insertAdjacentHTML("afterbegin", card);
}

function renderNoItemMessage() {
  const card = `
  <div" class="no-items-box">
      <h1 class="no-items-box__mesagge">Curently there are no items on auction</h1>
     
  </div>`;

  document.querySelector("#auction").insertAdjacentHTML("afterbegin", card);
}

function formatTime(seconds) {
  // Calculate minutes and seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Add leading zero if necessary
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  // Combine minutes and seconds
  var formattedTime = formattedMinutes + ":" + formattedSeconds;

  return formattedTime;
}
