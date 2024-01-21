import { getItemsList } from "./utils/localstorage.js";

const container = document.querySelector("#vistorListingCardContainer");
const filterOpen = document.querySelector(".filter-icon");
const filterForm = document.querySelector(".filter-form");
const filterApply = document.querySelector(".apply-btn");
const filterClose = document.querySelector(".close-btn");

export function initVisitorListing() {
  let allItems = getItemsList();

  const publishedItems = allItems.filter((item) => item.isPublished);

  publishedItems.forEach(renderCard);

  // Apply filter
  filterApply.addEventListener("click", function () {
    const title = getValue("#title-filter");
    const artist = getValue("#artist-filter");
    const minPrice = parseFloat(getValue("#min-price"));
    const maxPrice = parseFloat(getValue("#max-price"));
    const type = getValue("#type-filter");

    const filtered = publishedItems.filter(
      (item) =>
        (!title || item.title.includes(title)) &&
        (!artist || item.artist === artist) &&
        (isNaN(minPrice) || item.price >= minPrice) &&
        (isNaN(maxPrice) || item.price <= maxPrice) &&
        (!type || item.type === type)
    );
    // Utility function to get the value of an element by ID
    function getValue(id) {
      return document.querySelector(id)?.value.trim();
    }

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
        <span class="listing-card__price listing-card__price--${isDarkPrice}">${item.price.toLocaleString(
    "mk",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }
  )}</span>
      </div>
      <h5 class="listing-card__title">${item.title}</h5>
      <p class="listing-card__desc">${item.description}</p>
    </div>
  
</div>`;
}
