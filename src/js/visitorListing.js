import { items, itemTypes } from "./data/data.js";

const container = document.querySelector("#vistorListingCardContainer");
const filterOpen = document.querySelector(".filter-icon");
const filterForm = document.querySelector(".filter-form");
const filterApply = document.querySelector(".apply-btn");
const filterClose = document.querySelector(".close-btn");
const artistFilter = document.querySelector("#artist-filter");
const typeFilter = document.querySelector("#type-filer");

// Get all artist and dispplay in select
async function getFilterUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const userList = (users ?? []).map((user) => user.name);

    // Display all artist in select
    userList.forEach((user) => {
      if (!(artistFilter.children.length > userList.length))
        artistFilter.innerHTML += `<option value="${user}">${user}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}

export function initVisitorListing() {
  const publishedItems = items.filter((item) => item.isPublished);
  getFilterUsers();

  itemTypes.forEach((type) => {
    typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
  });

  publishedItems.forEach(renderCard);

  // Aplay filter
  filterApply.addEventListener("click", function () {
    const title = document.querySelector("#title-filter").value;
    const artist = document.querySelector("#artist-filter").value;
    const minPrice = document.querySelector("#min-price").value;
    const maxPrice = document.querySelector("#max-price").value;
    const type = document.querySelector("#type-filer").value;

    const filtered = publishedItems.filter(
      (item) =>
        (title ? item.title.includes(title) : true) &&
        (artist ? item.artist === artist : true) &&
        (minPrice ? item.price >= minPrice : true) &&
        (maxPrice ? item.price <= maxPrice : true) &&
        (type ? item.type === type : true)
    );

    container.innerHTML = "";
    filtered.forEach(renderCard);

    filterForm.style = "transform: translateX(100%)";
  });
}
// Openn filter form
filterOpen.addEventListener("click", function () {
  filterForm.style = "transform: translateX(0%)";
});

// Close filter form
filterClose.addEventListener("click", function () {
  filterForm.style = "transform: translateX(100%)";
});
// Render cards function
function renderCard(item, idx) {
  const isDarkBG = idx % 2 ? "dark" : "light";
  const isDarkPrice = !(idx % 2) ? "dark" : "light";

  container.innerHTML += `
<div class="listing-card listing-card--${isDarkBG}">
  <div class="listing-card__img">
    <img src="${item.image}" alt="${item.title}" />
  </div>
    <div class="listing-card__content">
      <div class="listing-card__info">
        <h4 class="listing-card__artist">${item.artist}</h4>
        <span class="listing-card__price listing-card__price--${isDarkPrice}">${item.price}$</span>
      </div>
      <h5 class="listing-card__title">${item.title}</h5>
      <p class="listing-card__desc">${item.description}</p>
    </div>
  
</div>`;
}
