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
  // Add new item eventhandler
  addNewBtn.addEventListener("click", function (e) {
    editNewContainer.style = "transform: translateX(0%)";
    location.hash = "#edit-new-item";
  });
  // Get all items action div with buttns and add event handler
  let itemsActionDiv = document.querySelectorAll(".artist-item-card__action");
  itemsActionDiv.forEach((el) =>
    el.addEventListener("click", actionItemsHandler)
  );

  // Function eventhandler to all btn items from artist list
  function actionItemsHandler(e) {
    const isitBtn = e.target.nodeName === "BUTTON";
    if (!isitBtn) {
      return;
    }
    // Get current item from itemList
    const card = e.target.closest(".artist-item-card");
    const itemId = +e.target.closest(".artist-item-card").id - 1;
    const curentIDfromItemsList = artistItems[itemId].id;
    const curenItemIndex = itemsList.findIndex(
      (item) => item.id === curentIDfromItemsList
    );
    const curentItemFromItems = itemsList[curenItemIndex];

    if (e.target.matches(".btn-remove")) {
      card.remove();
      itemsList.splice(curenItemIndex, 1);
    } else if (e.target.matches(".btn-edit")) {
      editNewContainer.style = "transform: translateX(0%)";
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
    }

    updateLocalStorage("itemsList", itemsList);
    console.log(curentItemFromItems, itemsList);
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
        <button class="btn btn--blue btn-toauction">Send to Auction</button>
        <button class="btn btn--${
          item.isPublished ? "unpublish" : "publish"
        } btn-ispublished">${
    item.isPublished ? "Unpublish" : "Publish"
  }</button>
        <button class="btn btn--secondary btn-remove">Remove</button>
        <button class="btn btn--light btn-edit">Edit</button>
    </div> 
  </div>`;
  // ANOTHER OPTION TO ADD ELEMENTS AND ADD EVENT HANDLER DIRETCLY ON RENDER
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

//Updates the data in local storage
function updateLocalStorage(name, array) {
  return localStorage.setItem(name, JSON.stringify(array));
}
