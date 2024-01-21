import {
  getCurrentArtist,
  getItemsList,
  updateLocalStorage,
  resetTimerValue,
} from "../js/utils/localstorage.js";
import { formatDate } from "./utils/dates.js";

const container = document.querySelector(".artist-items-container");
const addNewBtn = document.querySelector(".add-new-item__btn");
const editNewContainer = document.querySelector("#edit-new-item");

export let currentItemIndex;
export let isEdit = false;

export function initArtistItemsPage() {
  const itemsList = getItemsList();

  // Get curent artist
  const currentArtist = getCurrentArtist();

  // Get Artist items
  const artistItems = itemsList.filter((item) => item.artist === currentArtist);

  // Clear items conatiner befor rendering cards
  container.innerHTML = "";
  // Render curent artist cards
  artistItems.forEach(renderCard);

  // Add new item eventhandler
  addNewBtn.addEventListener("click", function () {
    editNewContainer.style = "transform: translateX(0%)";
    location.hash = "#edit-new-item";
    isEdit = false;
  });

  // Get all items action div with buttns and add event handler
  let itemsActionDiv = document.querySelectorAll(".artist-item-card__action");
  itemsActionDiv.forEach((el) =>
    el.removeEventListener("click", actionItemsHandler)
  );
  itemsActionDiv.forEach((el) =>
    el.addEventListener("click", actionItemsHandler)
  );

  // Function eventhandler to all btn items from artist list
  function actionItemsHandler(e) {
    e.stopImmediatePropagation();

    const isitBtn = e.target.nodeName === "BUTTON";
    if (!isitBtn) {
      return;
    }

    // Get current card
    const card = e.target.closest(".artist-item-card");
    // Get the item id property
    const itemId = +e.target.closest(".artist-item-card").id - 1;
    // Get curent id for the item from artist itemsList
    const curentIDfromItemsList = artistItems[itemId].id;
    // Get itmes indx from itemsList
    currentItemIndex = itemsList.findIndex(
      (item) => item.id === curentIDfromItemsList
    );
    // Get curent item from itemsList with indx
    const curentItemFromItems = itemsList[currentItemIndex];

    // Matchinng Logic for events on buttons
    if (e.target.matches(".btn-remove")) {
      card.remove();
      itemsList.splice(currentItemIndex, 1);
    } else if (e.target.matches(".btn-edit")) {
      isEdit = true;
      location.hash = "#edit-new-item";
    } else if (e.target.matches(".btn--publish")) {
      curentItemFromItems.isPublished = true;
      e.target.innerText = "Unpublish";
      e.target.classList.remove("btn--publish");
      e.target.classList.add("btn--unpublish");
    } else if (e.target.matches(".btn--unpublish")) {
      curentItemFromItems.isPublished = false;
      e.target.innerText = "Publish";
      e.target.classList.remove("btn--unpublish");
      e.target.classList.add("btn--publish");
    } else if (e.target.matches(".btn-to-auction")) {
      resetTimerValue();
      e.target.disabled = true;
      curentItemFromItems.isAuctioning = true;
      updateLocalStorage("AuctionItem", curentItemFromItems);
    }

    updateLocalStorage("itemsList", itemsList);
  }
}

// Function to render artist items cards
function renderCard(item, indx) {
  const dateObject = formatDate(item.dateSold);
  const card = `<div id="${indx + 1}" class="artist-item-card">
    <div class="artist-item-card__img">
      <img src="${item.image}" alt="${item.title}" />
    </div>
      <div class="artist-item-card__content">
        <div class="artist-item-card__info">
        <div>
        <h5 class="artist-item-card__title">${item.title}</h5>
        <p class="artist-item-card__date">${dateObject}</p>
        </div> 
          <span class="artist-item-card__price">${item.priceSold.toLocaleString(
            "mk",
            {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }
          )}</span>
        </div>
        <p class="artist-item-card__desc">${item.description}</p>
      </div>
      <div class="artist-item-card__action">
        <button class="btn btn--blue btn-to-auction" ${
          item.priceSold === "" && item.isPublished && !item.isAuctioning
            ? ""
            : "disabled"
        } >Send to Auction</button>
        <button class="btn btn--${
          item.isPublished ? "unpublish" : "publish"
        } btn-ispublished">${
    item.isPublished ? "Unpublish" : "Publish"
  }</button>
        <button class="btn btn--secondary btn-remove">Remove</button>
        <button class="btn btn--light btn-edit">Edit</button>
    </div>
  </div>`;

  container.insertAdjacentHTML("afterbegin", card);
}
