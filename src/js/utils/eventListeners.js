import { itemTypes } from "../data/data.js";

const artistMenu = document.querySelector(".header__artist-menu");
const menuLinks = document.querySelectorAll(".artist-menu-link");
const artistToggle = document.querySelector(".header__toggle--artist");
const typeFilter = document.querySelector("#type-filer");
const artistFilter = document.querySelector("#artist-filter");
const editNewType = document.getElementById("edit-new-item-type");

export const initEventListeners = (allArtists) => {
  // Add event on artist hamburger menu
  artistToggle.addEventListener("click", () => {
    artistMenu.classList.toggle("show-menu");
  });
  // Add event on all artist menu link
  menuLinks.forEach((el) => {
    el.addEventListener("click", () =>
      artistMenu.classList.toggle("show-menu")
    );
  });

  // Get all artist and dispplay in select
  itemTypes?.forEach((type) => {
    typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
  });
  // Get all item types and dispplay in filter select
  allArtists?.forEach((artist) => {
    artistFilter.innerHTML += `<option value="${artist}">${artist}</option>`;
  });
  // Get all item types and dispplay in edit select
  itemTypes.forEach((type) => {
    editNewType.innerHTML += `<option value="${type}">${type}</option>`;
  });
};
