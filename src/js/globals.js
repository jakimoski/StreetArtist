import { items, itemTypes } from "./data/data.js";
let currentArtist = localStorage.getItem("currentArtist") ?? "";

// Export all arists list ?NOT WORKING
export let allArtists = JSON.parse(localStorage.getItem("users"));

let itemId; //Curent id of the artist item ,that should be edited or removed
let auctionTimer; // There should be 2min timer for auctions set to locall storage

// Set All Artist Items List in locall storage
export let itemsList;
if (!JSON.parse(localStorage.getItem("itemsList"))) {
  localStorage.setItem("itemsList", JSON.stringify(items));
} else {
  itemsList = JSON.parse(localStorage.getItem("itemsList") ?? "");
}

// Get Current Artist
export function getCurrentArtist() {
  return localStorage.getItem("currentArtist") ?? currentArtist;
}
// Set Curent Artist
export function setCurrentArtist(artist) {
  currentArtist = artist;
  localStorage.setItem("currentArtist", currentArtist);
}
// Set all artists in locall storage ?NOT WORKING
(async function () {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    const userList = (users ?? []).map((user) => user.name);
    localStorage.setItem("users", JSON.stringify(userList));
  } catch (error) {
    console.log(error);
  }
})();
