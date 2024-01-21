import { items } from "../data/data.js";
import { getRandomDate } from "./dates.js";

// Update the items list and add new random dates
let newItems = items.map((item) => {
  return { ...item, dateSold: getRandomDate() };
});

// Export all artists list
export let getAllArtists = () =>
  JSON.parse(localStorage.getItem("users")) || null;

// Set All Artist Items List in locall storage
export const getItemsList = () => {
  const hasItemsList = JSON.parse(localStorage.getItem("itemsList"));
  if (hasItemsList) {
    return JSON.parse(localStorage.getItem("itemsList"));
  }
  localStorage.setItem("itemsList", JSON.stringify(newItems));
  return;
};

// Get Current Artist
export const getCurrentArtist = () =>
  localStorage.getItem("currentArtist") ?? "";

// Set Curent Artist
export function setCurrentArtist(artist) {
  localStorage.setItem("currentArtist", artist);
}

//Function to Update the data in local storage
export function updateLocalStorage(name, array) {
  return localStorage.setItem(name, JSON.stringify(array));
}

export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

export const resetTimerValue = () => {
  let interval = 40; //120sec = 2min
  localStorage.setItem("interval", interval);
};

setInterval(function () {
  let endTime = parseInt(localStorage.getItem("interval"));
  if (endTime >= 0) {
    endTime--;
    localStorage.setItem("interval", endTime);
  }
}, 1000);
