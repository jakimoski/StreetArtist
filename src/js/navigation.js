import { getCurrentArtist } from "./globals.js";

// const header = document.querySelector(".header");
const headerLogo = document.querySelector(".header__logo");
const headerToggle = document.querySelector(".header__toggle");
const artistToggle = document.querySelector(".header__toggle--artist");
const userToggle = document.querySelector(".header__toggle--user");
const artistMenu = document.querySelector(".header__artist-menu");
const menuLinks = document.querySelectorAll(".artist-menu-link");
const menuTitle = document.querySelector(".header__title");

// Landing page menu
export function landingNavigation() {
  headerLogo.style = "display:none";
  headerToggle.style = "display:none";
  menuTitle.textContent = "Street Artist";
  menuTitle.style = "margin-left:auto";
}
// Function to controll menu for users
export function userNavigation() {
  headerLogo.style = "display:block";
  headerToggle.style = "display:block";
  artistToggle.style = "display:none";
  userToggle.style = "display:block";
  menuTitle.textContent = "Street Artist";
  menuTitle.style = "";
}
// Function to controll menu for artists
export function artistNavigation() {
  headerLogo.style = "display:block";
  headerToggle.style = "display:block";
  artistToggle.style = "display:block";
  userToggle.style = "display:none";
  menuTitle.textContent = getCurrentArtist();
  menuTitle.style = "";
  artistToggle.addEventListener("click", () => {
    if (artistMenu.classList.contains("show-menu")) {
      artistMenu.classList.remove("show-menu");
    } else if (!artistMenu.classList.contains("show-menu")) {
      artistMenu.classList.add("show-menu");
    }
    return;
  });
  menuLinks.forEach((el) => {
    el.addEventListener("click", () =>
      artistMenu.classList.remove("show-menu")
    );
  });
}
