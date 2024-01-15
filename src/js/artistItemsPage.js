import { getCurrentArtist, itemsList } from "./globals.js";

const container = document.querySelector(".artist-items-container");
const addNewBtn = document.querySelector(".add-new-item__btn");
const editNewContainer = document.querySelector("#edit-new-item");

export function initArtistItemsPage() {
  // Get curent artist
  const currentArtist = getCurrentArtist();
  // Get Artist items
  const artistItems = itemsList.filter((item) => item.artist === currentArtist);
  // Get all sold artist items
  const soldArtistItems = artistItems.filter((item) => !!item.priceSold);
  // Render curent artist cards
  artistItems.forEach(renderCard);
  addNewBtn.addEventListener("click", function (e) {
    editNewContainer.style = "transform: translateX(0%)";
  });
  // Get remove btn and add event handler
  let handlerRemoveItem = document.querySelectorAll(".btn-remove");
  handlerRemoveItem.forEach((btn) =>
    btn.addEventListener("click", removehandler)
  );

  // Function to remove items from artist list
  function removehandler(e) {
    const itemId = +e.target.closest(".artist-item-card").id - 1;
    artistItems.splice(itemId, 1);
    container.innerHTML = "";
    artistItems.forEach(renderCard);
    // Get remove btn and again add event handler
    handlerRemoveItem = document.querySelectorAll(".btn-remove");
    handlerRemoveItem.forEach((btn) =>
      btn.addEventListener("click", removehandler)
    );
    // I SHOULD ALSO REMOVE ITEMS FROM LOCALL STORAGE
    // CREATE FUNCTION TO UPDATE THE ITEMS ARRAY ????
  }
}
// Function to render artist items cards
function renderCard(item, indx) {
  const card = `<div id="${indx + 1}" class="artist-item-card">
    <div class="artist-item-card__img">
      <img src="${item.image}" alt="${item.title}" />
    </div>
      <div class="artist-item-card__content">
        <div class="artist-item-card__info">
          <h4 class="artist-item-card__artist">${item.artist}</h4>
          <span class="artist-item-card__price">${item.price}$</span>
        </div>
        <h5 class="artist-item-card__title">${item.title}</h5>
        <p class="artist-item-card__desc">${item.description}</p>
      </div>
      <div class="artist-item-card__action">
        <button class="btn btn--blue">Send to Auction</button>
        <button class="btn btn--${item.isPublished ? "green" : "light"}">${
    item.isPublished ? "Unpublish" : "Publish"
  }</button>
        <button class="btn btn--secondary btn-remove">Remove</button>
        <button class="btn btn--light">Edit</button>
    </div> 
  </div>`;
  // ANOTHER OPTION TO ADD ELEMENTS AND ADD EVENT HANDLER DIRETCLY ON RENDER AND AVOID ADDING IT AGAIN IN HANDLER FUNCTION ??????
  // const artistCardAction = document.createElement("div");
  // const sendToAuctionBtn = document.createElement("button");
  // const setisPubslishBtn = document.createElement("button");
  // const removeItemBtn = document.createElement("button");
  // const editItemBtn = document.createElement("button");
  // artistCardAction.classList.add("artist-item-card__action");

  // artistCardAction.append(
  //   sendToAuctionBtn,
  //   setisPubslishBtn,
  //   removeItemBtn,
  //   editItemBtn
  // );

  container.insertAdjacentHTML("afterbegin", card);
}
