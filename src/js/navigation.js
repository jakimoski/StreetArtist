import { getCurrentArtist } from "../js/utils/localstorage.js";

const headerLogo = document.querySelector(".header__logo");
const headerToggle = document.querySelector(".header__toggle");
const artistToggle = document.querySelector(".header__toggle--artist");
const userToggle = document.querySelector(".header__toggle--user");
const menuTitle = document.querySelector(".header__title");

// Landing page menu
export function landingNavigation() {
  headerLogo.style = headerToggle.style = "display:none";
  menuTitle.textContent = "Street Artist";
  menuTitle.style = "margin-left:auto";
}
// Function to controll menu for users
export function userNavigation() {
  headerLogo.style = userToggle.style = headerToggle.style = "display:block";
  artistToggle.style = "display:none";
  menuTitle.textContent = "Street Artist";
  menuTitle.style = "";
}
// Function to controll menu for artists
export function artistNavigation() {
  const currentArtist = getCurrentArtist();
  headerLogo.style = headerToggle.style = artistToggle.style = "display:block";
  userToggle.style = "display:none";
  menuTitle.textContent = currentArtist;
  menuTitle.style = "";
}
